import api from "../../../Common/axios";
export default function ProductSpecs({ specs, onChange, id }) {


    const saveSpecs = async () => {
        try {
            await api.put(`/admin/products/${id}/specs`, specs);
            alert("Specifications saved");
        } catch (err) {
            console.error(err);
            alert("Failed to save specifications");
        }


    }


    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold border-b border-neutral-800 pb-2">
                Product Specifications
            </h3>

            <Textarea
                label="Overview"
                name="overview"
                value={specs.overview || ""}
                onChange={onChange}
            />

            <Textarea
                label="Specifications"
                name="specifications"
                value={specs.specifications || ""}
                onChange={onChange}
            />

            <Textarea
                label="Design Guidelines"
                name="designGuidelines"
                value={specs.designGuidelines || ""}
                onChange={onChange}
            />

            <Textarea
                label="Wash Care Instructions"
                name="washCare"
                value={specs.washCare || ""}
                onChange={onChange}
            />

            <button
                type="button"
                onClick={saveSpecs}
                className="px-6 py-3 rounded bg-orange-500"
            >
                Save Specs
            </button>

        </div>
    );
}

/* 🔹 Reusable Textarea */

function Textarea({ label, ...props }) {
    return (
        <div className="space-y-1">
            <label className="text-sm text-neutral-400">
                {label}
            </label>
            <textarea
                {...props}
                rows={4}
                className="
                    w-full p-3 bg-neutral-800 border border-neutral-700 rounded
                    resize-none focus:outline-none focus:ring-2 focus:ring-orange-500
                "
            />
        </div>
    );
}
