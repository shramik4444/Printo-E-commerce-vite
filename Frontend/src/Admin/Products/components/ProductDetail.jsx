import api from "../../../Common/axios";


export default function ProductDetails({ details, onChange, id }) {

    const saveDetails = async () => {
        try {
            const payload = {
                ...details,
                features: details.features.map(line => {
                    const [label, ...rest] = line.split(":");
                    return {
                        label: label?.trim(),
                        value: rest.join(":").trim()
                    };
                })
            };

            await api.put(`/admin/products/${id}/details`, payload);

            alert("Details saved");
        } catch (err) {
            console.error(err);
            alert("Failed to save details");
        }


    }



    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-neutral-800 pb-2">
                Product Details
            </h3>

            <Field
                label="Tagline"
                name="tagline"
                value={details.tagline || ""}
                onChange={onChange}
            />

            <Textarea
                label="Features (one per line)"
                name="features"
                value={(details.features || []).join("\n")}
                onChange={onChange}
            />

            <Textarea
                label="Key Feature"
                name="keyFeature"
                value={details.keyFeature || ""}
                onChange={onChange}
            />

            <Textarea
                label="Delivery Info"
                name="delivery"
                value={details.delivery || ""}
                onChange={onChange}
            />

            <Textarea
                label="Additional Info (JSON or text)"
                name="additionalInfo"
                value={details.additionalInfo || ""}
                onChange={onChange}
            />

            <button
                type="button"
                onClick={saveDetails}
                className="px-6 py-3 rounded bg-orange-500"
            >
                Save Specs
            </button>


        </div>

    );
}

/* Reusable inputs */

function Field({ label, ...props }) {
    return (
        <div className="space-y-1">
            <label className="text-sm text-neutral-400">{label}</label>
            <input
                {...props}
                className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded
                           focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>
    );
}

function Textarea({ label, ...props }) {
    return (
        <div className="space-y-1">
            <label className="text-sm text-neutral-400">{label}</label>
            <textarea
                {...props}
                rows={4}
                className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded
                           resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>
    );
}
