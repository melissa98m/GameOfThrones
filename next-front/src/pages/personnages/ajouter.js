import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import {useState , useEffect} from 'react'
import Input from '@/components/Input'
import Label from '@/components/Label'
import Button from '@/components/Button'
import { useRouter } from 'next/router'


const Ajouter = () => {
    // Route
    const router = useRouter();

    // Hook pour le name
    // const [name, setName] = useState();
    // const [image, setImage] = useState();
    // const [category, setCategory] = useState();
    const [familles, setFamilles] = useState({});

    useEffect( () => {
      getAlls()
    }, [])


    // Méthode POST
    const submitForm = async (event) => {
        event.preventDefault();
        const form = document.getElementById('addPersonnage');
        const data = new FormData(form)


        const ajouterPersonnage = async () => {
            await axios
                .post('/api/personnages', data, { headers: {"Content-Type":"multipart/form-data"} })
                .then(res => {
                    router.push('/personnages')
                })
                .catch(error => {
                    setErrors(error)
                    if (error.response.status !== 409) throw error
                })
        }
        ajouterPersonnage();
    };

    let getAlls = async () => {
            await axios.get('/api/familles')
                       .then(res => {
                           setFamilles(res.data.data);

                       });
        }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Ajouter un personnage
                </h2>
            }>
            <Head>
                <title>Laravel - Personnage</title>
            </Head>


        <div className="flex flex-col">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="px-2 py-6 md:px-6 py-6 bg-white border-b border-gray-200">
                            <form onSubmit={submitForm} id="addPersonnage">
                                <div className="mt-4">
                                    <Label htmlFor="name">
                                        Name
                                    </Label>
                                    <Input
                                        name="name"
                                        type="text"
                                        /*
                                        onChange = {
                                            event => {
                                                setName(event.target.value);
                                            }
                                        }
                                        */
                                        className="mt-1 block w-full"
                                        required
                                    />
                                </div>

                                <div className="mt-4">
                                 <Label htmlFor="nickname">Surnom</Label>
                                 <Input
                                 name="nickname"
                                 type="text"
                                 className="mt-1 block w-full"
                                 />
                                 </div>

                                 <div className="mt-4">
                                 <Label htmlFor="famille">Famille</Label>
                                 <select name="famille"
                                 id="famille"
                                 >

                                 </select>
                                 </div>
                                <div className="mt-4">
                                    <Label htmlFor="image">
                                        Image
                                    </Label>
                                    <Input
                                        name="image"
                                        type="file"
                                        className="mt-1 block w-full"
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <Button className="ml-4">Ajouter</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                                {familles.map((famille) => (
                                                    <div key={famille.id} className="group relative">

                                                            <div>
                                                                <h3 className="text-sm text-gray-700">
                                                                    {famille.name}
                                                                </h3>
                                                            </div>

                                                    </div>
                                                ))}
                                            </div>
        </AppLayout>
    )
}

export default Ajouter
