import { useState } from "react"

export default function TaskForm({ addTask }) {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [status, setStatus] = useState("")
    const [notes, setNotes] = useState("")
    const [errors, setErrors] = useState({});


    const validateForm = () => {
        const newErrors = {};
        if (!title) newErrors.title = "Tytuł jest wymagany.";
        if (!category) newErrors.category = "Kategoria jest wymagana.";
        if (!status) newErrors.status = "Status jest wymagany.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateForm()) return;
        addTask({ title, category, status, notes })
        setTitle("")
        setCategory("")
        setStatus("")
        setNotes("")
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-gray-50 shadow-lg rounded-md p-6 flex flex-col gap-4 border-2 border-blue-500"
        >
            <h2 className="text-2xl font-bold mb-2 text-blue-500">Dodaj nowe zadanie</h2>

            <div className="flex flex-col gap-2">
                <label className="font-medium text-blue-500">Tytuł</label>
                <input
                    type="text"
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="np. Stworzyć komponent Header"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col flex-1">
                    <label className="font-medium text-blue-500">Kategoria</label>
                    <select
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Wybierz kategorię</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Inne">Inne</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
                </div>

                <div className="flex flex-col flex-1">
                    <label className="font-medium text-blue-500">Status</label>
                    <select
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Wybierz status</option>
                        <option value="Do zrobienia">Do zrobienia</option>
                        <option value="W trakcie">W trakcie</option>
                        <option value="Ukończone">Ukończone</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-medium text-blue-500">Notatki</label>
                <textarea
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Dodatkowe informacje..."
                    rows="3"
                ></textarea>
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all duration-200"
            >
                Dodaj zadanie
            </button>
        </form>
    )
}
