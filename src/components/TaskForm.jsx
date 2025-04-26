import { useState } from "react"

export default function TaskForm({ addTask }) {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [status, setStatus] = useState("")
    const [notes, setNotes] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title || !category || !status) {
            alert("Wszystkie pola oprócz notatek są wymagane!")
            return
        }
        addTask({ title, category, status, notes })
        setTitle("")
        setCategory("")
        setStatus("")
        setNotes("")
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6 flex flex-col gap-4"
        >
            <h2 className="text-2xl font-bold mb-4">Dodaj nowe zadanie</h2>

            <div className="flex flex-col gap-2">
                <label className="font-medium">Tytuł</label>
                <input
                    type="text"
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="np. Stworzyć komponent Header"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col flex-1">
                    <label className="font-medium">Kategoria</label>
                    <select
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Wybierz kategorię</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Inne">Inne</option>
                    </select>
                </div>

                <div className="flex flex-col flex-1">
                    <label className="font-medium">Status</label>
                    <select
                        className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Wybierz status</option>
                        <option value="Do zrobienia">Do zrobienia</option>
                        <option value="W trakcie">W trakcie</option>
                        <option value="Ukończone">Ukończone</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="font-medium">Notatki</label>
                <textarea
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Dodatkowe informacje..."
                    rows="3"
                ></textarea>
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
            >
                Dodaj zadanie
            </button>
        </form>
    )
}
