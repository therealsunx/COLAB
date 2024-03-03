'use client';

import { projects } from "@/src/misc/dummy"
import { useParams } from "next/navigation"
import { AuthContext } from "@/src/components/AuthContext";
import { useContext, useEffect, useState } from "react";
import Login from "@/src/components/LogIn";

export default function ApplyPage() {
    const { user } = useContext(AuthContext);
    const params = useParams();
    const project = projects.find(x => x.id === params.id);

    return (
        <>
            {!user && <Login />}
            {user && <div className="flex flex-col items-center">
            <p className="text-xl font-semibold p-2">Apply for Involvement</p>
            <p className="text-4xl font-bold">Hello</p>
        </div>}
        
        </>
        
    )
}