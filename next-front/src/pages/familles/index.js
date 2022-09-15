import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import NavLink from "@/components/NavLink";
import Button from "@/components/Button";


const Familles = () => {
    // Route
    const router = useRouter();

    // Hooks : useState, useEffect
    const [familles, setFamilles] = useState([]);

    useEffect( () => {
        url();
    }, []) // Sans les crochets ça tourne en boucle

    const url = async () => {
        await axios.get('/api/familles')
            .then(res => {
                // console.log("axios :", res.data);
                setFamilles(res.data.data);
            });
    }

    // Supprimer un sport

    const deleteFamille = (familleID) => {
        // console.log("l'id sport à supprimer est", sportID);
        axios
            .delete(`/api/familles/${familleID}`)
            .then(res => {
                url()
            })
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Toutes les familles
                </h2>
            }>

            {/* Titre de l'onglet */}
            <Head>
                <title>Toutes les familles</title>
            </Head>

            {/*************************** Contenu ***************************/}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="bg-white">
                                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                                    <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Toutes les familles</h2>
                                    <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                        <NavLink
                                            className='btn btn-primary'
                                            href="/familles/ajouter"
                                            active={router.pathname === '/familles/ajouter'}>
                                            Ajouter une famille
                                        </NavLink>
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                        {familles.map((famille) => (
                                            <div key={famille.id} className="group relative">
                                                <div className="mt-4 flex justify-between">
                                                    <div>
                                                        <h3 className="text-sm text-gray-700">
                                                            {famille.name}
                                                        </h3>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            <NavLink href={`http://localhost:3000/familles/${famille.id}`}>Editer</NavLink>
                                                        </p>
                                                        <p className="mt-1 text-sm text-gray-500">
                                                            <button onClick={
                                                                () => {
                                                                    deleteFamille(famille.id);
                                                                }
                                                            }
                                                            >
                                                                Supprimer</button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Familles
