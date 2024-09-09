'use client'
import React from 'react'

interface ProjectFormProps {
    onAddProject: (project: { name: string; description: string }) => void;
}

function ProjectForm({ onAddProject }: ProjectFormProps) {

    // state variables
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    // handle form submission
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        
        // Add projects
        onAddProject({name, description})

        // reset form fields
        setName('')
        setDescription('')
    }

    return (
        <div className="flex flex-col items-center bg-gray-900 p-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-5xl mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Create New Project</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Project Name"
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description: </label>
                        <textarea
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            placeholder="Project Description"
                            className="mt-1 block w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Add Project
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ProjectForm