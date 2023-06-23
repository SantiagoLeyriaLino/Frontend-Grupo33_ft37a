import Image from "next/image"
import logo from "../../public/logocommerce.png"
import ContainerUsers from "@/components/DashboardAdmin/ContainerUsers"

export default function AdminPage () {

    return (
        <main>
                <nav className="flex justify-between w-[80%] mx-[auto] items-center py-[1rem]">
                    <Image 
                    className="w-[80px] h-[80px]"
                    src={logo}  alt="logo" width={600} height={600}/>
                    <div>Perfil Admin</div>
                </nav>
            <section className="flex">
                <article className="flex flex-col w-[20%] bg-red-400 p-[2rem] gap-y-[2rem]">
                    <span className="font-medium text-[1.2rem] cursor-pointer">Estadisticas</span>
                    <span className="font-medium text-[1.2rem] cursor-pointer">Usuarios</span>
                    <span className="font-medium text-[1.2rem] cursor-pointer">Productos</span>
                    <span className="font-medium text-[1.2rem] cursor-pointer">Ventas</span>
                    <span className="font-medium text-[1.2rem] cursor-pointer">Baneados</span>
                    
                </article>
                <article className="w-[80%] bg-blue-400">
                    <ContainerUsers/>
                </article>
            </section>
        </main>
    )
}