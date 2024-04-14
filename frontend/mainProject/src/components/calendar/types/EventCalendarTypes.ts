import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { Moment } from "moment";
import { ReactNode } from "react";

export type DaysGrid = {
    no: number;
    date: Moment;
};

export type Event = {
    id?: string;
    title: string;
    popupContent: ReactNode | ReactNode[];
    popupContent1: ReactNode | ReactNode[];
    startDate: Date | Moment;
    endDate: Date | Moment;
    color?: string;
}

export type EventsData = Array<Event>
