"use client";
import { IcarAnnouncement } from "@/Components/Card";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

export type TFilterRequest = {
  brand?: string;
  model?: string;
  year?: string;
  fueltype?: string;
  color?: string;
  minkm?: string;
  maxkm?: string;
  minprice?: string;
  maxprice?: string;
};

export const useCarsFilter = () => {
  const [listCarsAnnouncement, setListCarsAnnouncement] = useState<IcarAnnouncement[]>([]);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({} as TFilterRequest);

  const retrieveCars = async () => {
    const queryParams = new URLSearchParams({ ...inputValues });
    try {
      const response = await api<IcarAnnouncement[]>(`/filters?${queryParams}`);
      const { data } = response;
      setListCarsAnnouncement(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    retrieveCars();
  }, [inputValues]);

  return {
    listCarsAnnouncement,
    setListCarsAnnouncement,
    inputValues,
    setInputValues
  };
};
