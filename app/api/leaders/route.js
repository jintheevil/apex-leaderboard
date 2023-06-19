import {NextResponse} from "next/server";
import {parse} from "url";
import {supabase} from "@/lib/supabaseDatabase";

export async function GET(req) {
    const {query} = parse(req.url, true);

    // Response if mode chosen is not valid
    if (!['sum', 'max'].includes(query.mode)) {
        return NextResponse.json({
            message: 'Error! Mode chosen is not a valid choice.',
            status: 400,
            ok: false,
        })
    }

    try {
        // SELECT all entries in 'leaders' table in supabase
        const response = await supabase.from('leaders').select();

        // Get all unique names in the table
        const uniqueNames = [...new Set(response.data.map(leader => leader.leader_name))];

        // New array for modified table
        let newArr = [];

        // Response if mode chosen is 'sum'
        if (!response.error && query.mode === 'sum') {
            // Push an object of name and summed score for each unique name found in the table
            uniqueNames.forEach((name) => {
                newArr.push(
                    {
                        name,
                        score: response.data.filter((leader) => leader.leader_name === name)
                    .reduce((a, b) => {
                            return a + b.leader_score;
                        }, 0)
                    }
                )
            })

            // JSON response
            return NextResponse.json({
                data: newArr.sort((a, b) => b.score - a.score),
                message: 'Leaderboard data retrieved!',
                status: 200,
                ok: true
            })
        }

        // Response if mode chosen is 'max'
        if (!response.error && query.mode === 'max') {
            uniqueNames.forEach((name) => {
                newArr.push(
                    {
                        name,
                        score : response.data.filter((leader) => {
                            return leader.leader_name === name;
                        }).reduce((a,b) => {
                            return a.leader_score > b.leader_score ? a : b;
                        })['leader_score']
                    }
                )
            })

            // JSON response
            return NextResponse.json({
                data: newArr.sort((a, b) => b.score - a.score),
                message: 'Leaderboard data retrieved!',
                status: 200,
                ok: true,
            })
        }
    } catch (err) {
        // Log the error and send the appropriate JSON response
        console.log(err);
        return NextResponse.json({
            message: 'An error has occured, try again.',
            status: 500,
            ok: false,
        })
    }
}

export async function POST(req) {
    const { name, score } = await req.json();

    try {
        // INSERT new leader into 'leaders' table in supabase
        const { data, error } = await supabase
            .from('leaders')
            .insert([
                {
                    leader_name: name,
                    leader_score: score
                }
            ]);

        // If there's an error, respond with a JSON error message
        if (error) {
            console.log(error);
            return NextResponse.json({
                message: 'An error has occurred during insertion.',
                status: 500,
                ok: false,
            });
        }

        // If everything is OK, respond with a success message
        return NextResponse.json({
            message: 'Successfully inserted new leader.',
            status: 200,
            ok: true,
            data,
        });

    } catch (err) {
        // Log the error and send the appropriate JSON response
        console.log(err);
        return NextResponse.json({
            message: 'An error has occurred, please try again.',
            status: 500,
            ok: false,
        });
    }
}

// export async function UPDATE(req) {
//
// }
//
// export async function DELETE(req) {
//
// }

