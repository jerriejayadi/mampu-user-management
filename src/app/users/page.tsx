export default function Home() {
  return (
    <main className="flex flex-col p-4">
      <h1 className="text-2xl font-bold">Welcome to Mampu User Management</h1>
      <p>Manage your users efficiently and effectively.</p>

      <table className="min-w-full bg-neutral-800">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border-b">John Doe</td>
            <td className="py-2 px-4 border-b">john.doe@example.com</td>
            <td className="py-2 px-4 border-b">Admin</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
