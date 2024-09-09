'use client'
import React from 'react'
import ProjectForm from '../components/ProjectForm'
import ProjectList from '../components/ProjectList'


function ProjectsPage() {
    // state variables
    const [projects, setProjects] = React.useState<any[]>([])

    // fetch all projects
    React.useEffect(() => {
        const fetchProjects = async () => {
            const res = await fetch('/api/projects')
            const data = await res.json()

            if (res.ok) {
                setProjects(data.data)
            }
        }

        fetchProjects()
    }, [])

    // add a new project
    const addProject = async (project: any) => {
        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(project),
            });

            if (res.ok) {
                const newProject = await res.json();
                setProjects([...projects, newProject.data]);
            } else {
                console.error('Failed to add project');
            }
        } catch (error: any) {
            console.error('An error occurred while adding the project:', error);
        }
    }

    return (
        <div>
            <ProjectForm onAddProject={addProject} />
            <ProjectList projects={projects} />
        </div>
    )
}

export default ProjectsPage