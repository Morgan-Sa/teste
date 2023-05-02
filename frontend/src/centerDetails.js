export function CenterDetails({ center }) {
  if (!center) {
    return (
      <div className="p-4">Clique em um dos marcadores para ver detalhes</div>
    );
  }

  return (
    <table className="border-spacing-4 border-separate">
      <tr>
        <td className="font-semibold">nome</td>
        <td>{center.name}</td>
      </tr>
      <tr>
        <td className="font-semibold">email</td>
        <td>{center.email}</td>
      </tr>
    </table>
  );
}
