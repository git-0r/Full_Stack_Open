import { useQuery } from "@apollo/client"
import { allBooks, ME } from "../queries"

const Recommend = (props) => {
    const { loading, error, data } = useQuery(ME)
    const books = useQuery(allBooks, { variables: { "genre": data?.me?.favouriteGenre } })

    return !props.show ? null :
        <>
            <h1>Recommendations</h1>
            <h2>Books in your favourite genre patters</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books?.data?.allBooks?.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
}

export default Recommend