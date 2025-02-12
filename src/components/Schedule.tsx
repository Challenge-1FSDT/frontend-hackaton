"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentTimezonePlugin from '@fullcalendar/moment-timezone';

interface Lectures {
  id: string;
  name: string;
  startAt: string;
  endAt: string;
}

const Schedule = ({ lectures }: { lectures: Lectures[] }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-l" id="schedule">
      <h2 className="text-xl font-bold mb-4">Agenda - Fevereiro de 2025</h2>
      <FullCalendar
        timeZone="America/Sao_Paulo"
        locale="pt-br"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, momentTimezonePlugin]}
        initialView="timeGridWeek"
        events={lectures.map((lecture) => ({
          id: lecture.id,
          title: lecture.name,
          start: lecture.startAt,
          end: lecture.endAt,
        }))}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="auto"
        weekends={false}
        selectable={true}
        validRange={{
          start: "2025-01-01",
          end: "2025-12-31",
        }}

      />
    </div>
  );
};

export default Schedule;
