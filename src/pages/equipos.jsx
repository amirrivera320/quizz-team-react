import { Card } from "flowbite-react";
import { FaTelegramPlane } from "react-icons/fa";

export default function MyPage() {
    const teams = [
        { team1: "Equipo 1", team1Image: "img/icon 1.jpg", team2: "Equipo 2", team2Image: "img/icon 2.jpg" },
        { team1: "Equipo 3", team1Image: "img/icon 3.jpg", team2: "Equipo 4", team2Image: "img/icon 4.jpg" },
        { team1: "Equipo 5", team1Image: "img/icon 5.jpg", team2: "Equipo 6", team2Image: "img/icon 6.jpg" },
        { team1: "Equipo 7", team1Image: "img/icon 7.jpg", team2: "Equipo 8", team2Image: "img/icon 8.jpg" },
    ];

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">Equipos en enfrentamiento</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teams.map((team, index) => (
                    <Card key={index} className="w-full">
                        <div className="text-center">
                            <div className="flex flex-col items-center">
                                <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{team.team1}</h5>
                                <img src={team.team1Image} alt={team.team1} className="w-24 h-24 mb-2" />
                            </div>
                            <div className="mb-0 text-3xl font-medium text-zinc-950 dark:text-slate-950">vs</div> {/* Cambia el tamaño del texto aquí */}
                            <div className="flex flex-col items-center">
                                <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{team.team2}</h5>
                                <img src={team.team2Image} alt={team.team2} className="w-24 h-24 mb-2" />
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <a
                                href="#"
                                className="inline-flex items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                            >
                                <svg
                                    className="mr-3 h-7 w-7"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="eye"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M572.52 241.4C518.42 135.3 412.23 64 288 64 163.77 64 57.58 135.3 3.48 241.4c-4.64 9.3-4.64 20.9 0 30.3C57.58 376.7 163.77 448 288 448c124.23 0 230.42-71.3 284.52-176.4 4.64-9.3 4.64-20.9 0-30.3zM288 400c-66.2 0-120-53.8-120-120s53.8-120 120-120 120 53.8 120 120-53.8 120-120 120zm0-192c-39.7 0-72 32.3-72 72s32.3 72 72 72 72-32.3 72-72-32.3-72-72-72z"
                                    />
                                </svg>
                                <div className="text-left">
                                    <div className="font-sans text-sm font-semibold">Ver</div>
                                </div>
                            </a>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
