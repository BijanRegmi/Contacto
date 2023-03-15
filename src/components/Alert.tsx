import { AppContext } from "@/pages/_app"
import { AlertType, ContextActionKind } from "@/utils/reducer"
import { useContext } from "react"

const Alert = () => {
    const {
        state: { alerts },
        dispatch,
    } = useContext(AppContext)

    if (alerts.length == 0) return <></>

    const getBg = (type: AlertType) => {
        if (type == AlertType.SUCCESS) return "bg-green-400"
        else if (type == AlertType.DEBUG) return "bg-blue-400"
        else return "bg-red-400"
    }

    const closeAlert = (idx: number) => {
        dispatch({ type: ContextActionKind.CLOSEALERT, payload: { idx } })
    }

    return (
        <div className="absolute bottom-[20px] right-[20px] flex flex-col-reverse items-end gap-4 px-4 py-2 z-50">
            {alerts.map((alert, idx) => {
                const bg = getBg(alert.type)
                return (
                    <div
                        key={idx}
                        className={`${bg} px-4 py-2 rounded-md cursor-pointer border border-transparent border-solid hover:border-gray-300 relative shadow-[rgba(60,64,67,0.3)0px_1px_2px_0px,rgba(60,64,67,0.15)0px_1px_3px_1px] alert`}
                        onClick={() => closeAlert(idx)}
                    >
                        {alert.message}
                    </div>
                )
            })}
        </div>
    )
}

export default Alert
