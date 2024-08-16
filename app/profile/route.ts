// app/profile/route.ts

import { NextResponse } from 'next/server';
import * as fs from 'fs';
import path from 'path';

let ProfileInfo = {
    username: 'johndoe',
    password: 'password',
    goals: [],
};

// Function to write profile info to a file
const SetProfileInfo = () => {
    const filePath = path.join(process.cwd(), 'user_info.json');
    fs.writeFile(filePath, JSON.stringify(ProfileInfo, null, 2), (err) => {
        if (err) throw err;
        console.log('User info file has been edited');
    });
};

// GET handler
export async function GET() {
    return NextResponse.json(ProfileInfo);
}

// POST handler
export async function POST(req: Request) {
    try {
        const body = await req.json();
        ProfileInfo = { ...ProfileInfo, ...body };
        SetProfileInfo();
        return NextResponse.json({ message: 'Profile updated successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}
