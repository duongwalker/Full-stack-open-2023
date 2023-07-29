const Persons = (props) => {
    const {name, number, onClick} = props
  return (
    <table>
      <tbody>
      <tr>
        <td>{name}</td>
        <td>{number}</td>
        <td><button onClick={onClick}>delete</button></td>
      </tr>
      </tbody>
    </table>
  )
}

export default Persons