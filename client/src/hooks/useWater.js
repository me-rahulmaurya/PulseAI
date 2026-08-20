import { useQuery } from "@tanstack/react-query";
import { getTodayWater } from "../services/water.service";

export default function useWater() {

    return useQuery({

        queryKey:["water"],

        queryFn:getTodayWater

    });

}