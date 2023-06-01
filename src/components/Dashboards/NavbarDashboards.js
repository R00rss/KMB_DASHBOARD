import React from 'react'
import "../../pages/DashboardPage.css"
export default function NavbarDashboards({ dashboard_options, handle_change_dashboard, status }) {
    return (
        <div className="flex justify-start items-center ml-3 gap-3">
            <button
                onClick={() => handle_change_dashboard("dashboard1")}
                className={`${dashboard_options.dashboard1 ? "bg-transparent text-[var(--secondary-color)]" : "text-slate-200"} outline-none focus:outline-none px-2 py-1 rounded-b-lg bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] hover:bg-transparent hover:text-[var(--secondary-color)] duration-300`}
            >
                Análisis Individual Trx
            </button>

            <button
                onClick={() => handle_change_dashboard("dashboard2")}
                className={`${dashboard_options.dashboard2 ? "bg-transparent text-[var(--secondary-color)]" : "text-slate-200"} outline-none focus:outline-none px-2 py-1 rounded-b-lg bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] hover:bg-transparent hover:text-[var(--secondary-color)] duration-300`}
            >
                Análisis Global Trx
            </button>
            <button
                className={`${dashboard_options.dashboard4 ? "bg-transparent text-[var(--secondary-color)]" : "text-slate-200"} outline-none focus:outline-none px-2 py-1 rounded-b-lg bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] hover:bg-transparent hover:text-[var(--secondary-color)] duration-300`}

                onClick={() => handle_change_dashboard("dashboard4")}
            >
                Voz del Cliente
            </button>
            <button
                onClick={() => handle_change_dashboard("dashboard5")}
                className={`${dashboard_options.dashboard5 ? "bg-transparent text-[var(--secondary-color)]" : "text-slate-200"} outline-none focus:outline-none px-2 py-1 rounded-b-lg bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] hover:bg-transparent hover:text-[var(--secondary-color)] duration-300`}

            >
                Análisis Call Center
            </button>
            {status === 3 ? (
                <></>
            ) : (
                <button
                    onClick={() => handle_change_dashboard("dashboard3")}
                    className={`${dashboard_options.dashboard3 ? "bg-transparent text-[var(--secondary-color)]" : "text-slate-200"} outline-none focus:outline-none px-2 py-1 rounded-b-lg bg-[var(--secondary-color)] border-2 border-[var(--secondary-color)] hover:bg-transparent hover:text-[var(--secondary-color)] duration-300`}
                >
                    Análisis Estados
                </button>
            )}
        </div>
    )
}
