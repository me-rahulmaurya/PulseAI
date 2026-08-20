import { useQuery } from "@tanstack/react-query";
import { getMedications } from "../services/medication.service";

export default function useMedication() {

    return useQuery({

        queryKey:["medications"],

        queryFn:getMedications

    });

}