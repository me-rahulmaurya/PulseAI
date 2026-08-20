import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/health.service";

export default function useHealth() {
    return useQuery({
        queryKey: ["health-profile"],
        queryFn: getProfile,
    });
}