import React from "react";
import Card from "../card";
import { AiOutlineUser } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function TeacherProfile() {
    const {user,assignements,groups,options,teacher,branches} = useSelector(state=>state);
   

    const UniqueGroups = [...new Map(assignements.map(v => [v.group, v])).values()]
    // useEffect(()=>{
    //     setTeacherGroups(
    //         assignements.map(item=>item.group)
    //     )
    // },[])

  return (
    <Card title="Mon Profile" icon={AiOutlineUser}>
      <div className="bg-gray-100">
 

    <div  className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
            <div className="w-full md:w-4/12 md:mx-2">
                <div className="bg-white p-3 border-t-4 border-green-400">
                    <div className="image overflow-hidden">
            
                    </div>
                    <img
                          className="rounded-full "
                          src={`https://avatars.dicebear.com/v2/initials/${user.first_name[0]}-${user.last_name[0]}.svg`}
                        />
                    <h1 className="text-sky-900 text-center font-bold text-xl leading-8 my-1">{user.first_name.toUpperCase()} {user.last_name.toUpperCase()}</h1>
                                      <ul
                        className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                        <li className="flex items-center py-3">
                            <span>Status</span>
                            <span className="ml-auto"><span
                                    className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                        </li>
                        <li className="flex items-center py-3">
                            <span>Rejoindre En</span>
                            <span className="ml-auto">{user.hiring_date}</span>
                        </li>
                    </ul>
                </div>
                <div className="my-4"></div>
                
            </div>
            <div className="w-full md:w-8/12 mx-2 h-64">

                <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </span>
                        <span className="tracking-wide">Information Personnel</span>
                    </div>
                    <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Nom</div>
                                <div className="px-4 py-2">{user.first_name.toUpperCase()}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Prenom</div>
                                <div className="px-4 py-2">{user.last_name.toUpperCase()}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Sexe</div>
                                <div className="px-4 py-2">{user.gender=="male"?"masculin":"femenin"}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Telephone</div>
                                <div className="px-4 py-2">{user.tele}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">Adress Actuelle</div>
                                <div className="px-4 py-2">{user.adress}</div>
                            </div>
                            <div className="grid grid-cols-2">
                                <div className="px-4 py-2 font-semibold">date de naissance</div>
                                <div className="px-4 py-2">{user.birthday}</div>
                            </div>
                            <div className="flex">
                                <div className="px-4 py-2 font-semibold">Email</div>
                                <div className="px-4 py-2">
                                    <a className="text-blue-800" href="#">{user.email}</a>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                  
                </div>


                <div className="bg-white p-3 my-6 shadow-sm rounded-sm">

                    <div className="grid grid-cols-2">
                        <div>
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">Groupes</span>
                            </div>
                            <ul className="list-inside space-y-2">
                                {UniqueGroups.map((item,index)=>{
                                    return(
                                        <li key={index}><Link to="/formateur/modules">
                                        <div className="text-teal-600 text-base">{(options.find(elem=>elem.id==groups.find(elem1=>elem1.id==item.group).option).season==1?"1ére anneé :":"2éme anneé :")+ branches.find(elem=>elem.id==options.find(elem1=>elem1.id==groups.find(elem2=>elem2.id==item.group).option).branch).name + (options.find(elem=>elem.id==groups.find(elem1=>elem1.id==item.group).option).season==2?" option "+options.find(elem=>elem.id==groups.find(elem2=>elem2.id==item.group).option).name:"")+ " group "+ groups.find(elem=>elem.id==item.group).name}</div>
                                        <div className="text-gray-500 text-xs">{assignements.filter(elem=>elem.group==item.group).length} module</div>
                                    </Link></li>
                                    )
                                })}                          
                             
                            </ul>
                        </div>
                        {/* <div>
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                        <path fill="#fff"
                                            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">Education</span>
                            </div>
                            <ul className="list-inside space-y-2">
                                <li>
                                    <div className="text-teal-600">Masters Degree in Oxford</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                                <li>
                                    <div className="text-teal-600">Bachelors Degreen in LPU</div>
                                    <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </Card>
  );
}
