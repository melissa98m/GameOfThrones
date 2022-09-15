import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import NavLink from "@/components/NavLink";


const Personnages = () => {
   // Route
   const router = useRouter();

  // Hooks : useState, useEffect
  const [personnages, setPersonnages] = useState([]);

  useEffect( () => {
    url();
  }, []) // Sans les crochets ça tourne en boucle

  const url = async () => {
      await axios.get('/api/personnages')
     .then(res => {
        setPersonnages(res.data.data);
     });
  }

  const deletePersonnage = (personnageID) => {
    // console.log("l'id sport à supprimer est", sportID);
    axios
    .delete(`/api/personnages/${personnageID}`)
    .then(res => {
      url()
    })


  }
  return (
    <AppLayout
      header={
          <h2 className="font-semibold text-xl text-gray-800 leading-tight">
              Tous les personnages
          </h2>
      }>

      {/* Titre de l'onglet */}
      <Head>
          <title>Tous les personnages</title>
      </Head>

      {/*************************** Contenu ***************************/}
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                  <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Tous les personnages</h2>
                  <NavLink
                    className='btn btn-primary'
                    href="/personnages/ajouter"
                    active={router.pathname === '/personnages/ajouter'}>
                    Ajouter un personnage
                    </NavLink>

                  <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {personnages.map((personnage) => (
                      <div key={personnage.id} className="group relative">
                        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                          <img
                            src={`http://127.0.0.1:8000/storage/uploads/${personnage.image}`}                            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                                Nom:{personnage.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-700">
                             Surnom:{personnage.nickname}</p>
                            <p className="mt-1 text-sm text-gray-700">
                            Famille:{personnage.famille.name}</p>
                            <p className="mt-1 text-sm text-gray-700">
                                <em>Naissance:{personnage.naissance}</em></p>
                            <button className="text-gray-800">
                            <a href={`http://localhost:3000/personnages/edit/${personnage.id}`}>Editer</a>
                            </button>
                            <p className="">
                            <button onClick={
                              () => {
                                  deletePersonnage(personnage.id);
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

export default Personnages
