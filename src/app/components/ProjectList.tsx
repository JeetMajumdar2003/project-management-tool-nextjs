'use client'
import React from 'react'

// TypeScript interface for a project type
interface Project {
    _id: string;
    name: string;
    description: string;
    status: string;
    createdAt: string;
}

function ProjectList({ projects }: { projects: Project[] }) {
    return (
        <div className="container mx-auto p-4 w-full">
            <h1 className="text-4xl font-bold text-center text-white mb-8">Project List</h1>
            {projects.map((project: Project) => (
            <div key={project._id} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-5xl mb-8 mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">{project.name}</h2>
            <p className="text-gray-300 mb-2"><strong>Project Name:</strong> {project.name}</p>
            <p className="text-gray-300 mb-4"><strong>Description:</strong> {project.description}</p>

            <div className="mt-4 flex justify-between items-center">
            <span className="text-gray-400">Status: {project.status}</span>
            <span className="text-gray-400">Created At: {new Date(project.createdAt).toLocaleDateString()}</span>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type='button'
            >
                View Project
            </button>
            </div>
            </div>
            ))}
        </div>
    )
}

export default ProjectList