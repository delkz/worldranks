
// app/api/route.js 👈🏽
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import axios from 'axios';
import Country from "@/types/countryType";
import { countriesApi } from "@/services/api";

// To handle a GET request to /api
export async function GET(request: NextApiRequest, response: NextApiResponse) {
    // https://restcountries.com/v3.1/all

    try {
        const response = await countriesApi.get('all');

        let countries: Country[] = response.data;

        return NextResponse.json({ countries }, { status: 200 })
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        } else {
            throw error
        }
    }

}

// To handle a POST request to /api
export async function POST(request: Request, response: NextApiResponse) {
    return NextResponse.json({ message: "Should be GET" }, { status: 405 });
    // const data = await request.json();
    // const { error } = await supabase
    // 	.from('reports')
    // 	.insert(data)

    // if(error) {
    // 	return NextResponse.json({ error: error.message }, { status: Number(error.code) });
    // }

    // return NextResponse.json({ message: "report received" ,data }, { status: 200 });
}
