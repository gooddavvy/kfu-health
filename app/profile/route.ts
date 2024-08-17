import { NextResponse } from 'next/server';
import * as fs from 'fs';
import path from 'path';

// Function to get profile info
let GetProfileInfo = (): any => {
    const filePath = path.join(process.cwd(), 'user_info.json'); // Use process.cwd() to refer to the project root

    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (err) {
        console.error('Error reading `user_info.json`:', err as Error);
        // Throw an error to prevent returning an empty object
        throw new Error('Failed to retrieve profile information');
    }
}

// Variable to hold profile info
let profileInfo: any;
try {
    profileInfo = GetProfileInfo();
} catch (error) {
    console.error((error as Error).message);
    // Handle initialization failure as needed, such as rethrowing or logging
}

// Function to write profile info to a file
let SetProfileInfo = () => {
    const filePath = path.join(process.cwd(), 'user_info.json'); // Use process.cwd() to refer to the project root

    fs.writeFile(filePath, JSON.stringify(profileInfo, null, 2), (err) => {
        if (err) {
            console.error('Error writing to `user_info.json`:', err as Error);
            throw new Error('Failed to update profile information');
        } else {
            console.log('User info file has been edited');
        }
    });
};

// GET handler
export async function GET() {
    try {
        const profileData = GetProfileInfo();
        return NextResponse.json(profileData);
    } catch (error) {
        console.error((error as Error).message);
        return NextResponse.json({ error: 'Failed to retrieve profile information' }, { status: 500 });
    }
}

// POST handler
export async function POST(req: Request) {
    try {
        const body = await req.json();
        profileInfo = { ...profileInfo, ...body };
        SetProfileInfo();
        return NextResponse.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error processing POST request:', error as Error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
