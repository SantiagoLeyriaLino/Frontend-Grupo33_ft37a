export default function ContainerUsers() {

    const users = [
        {
            user_name: "nahucham",
            email: "nahu.chamo19@gmail.com",
            email_confirmado: "true",
            last_activity: "2023-06-14",
            last_profile_update: "2023-06-14",
            admin: "true"
        },
        {
            user_name: "santiago",
            email: "santiago@gmail.com",
            email_confirmado: "true",
            last_activity: "2023-06-14",
            last_profile_update: "2023-06-14",
            admin: "true"
        },
        {
            user_name: "francisco",
            email: "francisco@gmail.com",
            email_confirmado: "true",
            last_activity: "2023-06-14",
            last_profile_update: "2023-06-14",
            admin: "true"
        },
        {
            user_name: "sofia",
            email: "sofia@gmail.com",
            email_confirmado: "true",
            last_activity: "2023-06-14",
            last_profile_update: "2023-06-14",
            admin: "true"
        },
        {
            user_name: "andres",
            email: "andres@gmail.com",
            email_confirmado: "true",
            last_activity: "2023-06-14",
            last_profile_update: "2023-06-14",
            admin: "true"
        },
        {
            user_name: "estefania",
            email: "estefania@gmail.com",
            email_confirmado: "true",
            last_activity: "2023-06-14",
            last_profile_update: "2023-06-14",
            admin: "true"
        },
    ]
    return (
        <div className="w-[90%] p-[1rem]">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-[1px] border-black">img_profile</th>
                        <th className="py-2 px-4 border-[1px] border-black">user_name</th>
                        <th className="py-2 px-4 border-[1px] border-black">email</th>
                        <th className="py-2 px-4 border-[1px] border-black">email_confirmado</th>
                        <th className="py-2 px-4 border-[1px] border-black">last_activity</th>
                        <th className="py-2 px-4 border-[1px] border-black">last_profile_update</th>
                        <th className="py-2 px-4 border-[1px] border-black">admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.user_name}>
                            <td className="py-2 px-4  border-[1px] border-black">{user.img_profile}</td>
                            <td className="py-2 px-4  border-[1px] border-black">{user.user_name}</td>
                            <td className="py-2 px-4  border-[1px] border-black">{user.email}</td>
                            <td className="py-2 px-4  border-[1px] border-black">{user.email_confirmado}</td>
                            <td className="py-2 px-4  border-[1px] border-black">{user.last_activity}</td>
                            <td className="py-2 px-4  border-[1px] border-black">{user.last_profile_update}</td>
                            <td className="py-2 px-4  border-[1px] border-black">{user.admin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}