function InscribedItems ({inscribed}) {

    const {id, name, email, avatar} = inscribed

    console.log(inscribed)
    return (
        <tr>
            <td>{avatar}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{id}</td>
        </tr>

    )

}

export default InscribedItems;