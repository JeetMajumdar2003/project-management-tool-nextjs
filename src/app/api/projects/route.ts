import connectToDatabase from '@/DB/mongodb';
import Project from '@/models/Project.model';
import { NextRequest, NextResponse } from 'next/server';

// GET route to fetch all projects
export async function GET(req: NextRequest) {
    await connectToDatabase();

    try {
        const projects = await Project.find({});
        return NextResponse.json({ success: true, data: projects }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

// POST route to create a new project
export async function POST(req: NextRequest) {
    await connectToDatabase();

    try {
        const reqBody = await req.json();
        const { name, description } = reqBody;

        // Check if required fields are provided
        if (!name || !description) {
            return NextResponse.json({ success: false, message: "Please provide all the required fields." }, { status: 400 });
        }

        // Create a new project
        const project = await new Project({
            name,
            description
        }).save();

        return NextResponse.json({ success: true, data: project }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}
