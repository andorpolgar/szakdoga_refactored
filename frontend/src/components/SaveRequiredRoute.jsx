import { Navigate } from "react-router-dom";
import { useGameStore } from "../store/gameStore";

export default function SaveRequiredRoute({ children }) {
  const activeSaveId = useGameStore((state) => state.activeSaveId);

  if (!activeSaveId) {
    return <Navigate to="/saves" replace />;
  }

  return children;
}