import { JSX } from "react";
import "./VusualInterface.css";
import NotificationList from "./elements/Notification/NotificationList";
import ServerConnectionStatus from "./elements/ServerConnectionStatus/ServerConnectionStatus";
import { useSelector } from "react-redux";
import { RootState } from "@app-redux/store";

export default function VusualInterface(): JSX.Element {
    const { statusConnectionServer } = useSelector((s: RootState) => s.gameSettings);

    return (
        <div className="visual-interface">
            {statusConnectionServer.isShow && <ServerConnectionStatus cls={'status-connect-server'}/>}
            <NotificationList />
        </div>
    );
} 