import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { RendezvousService } from 'src/app/services/gestionNutrition/rendezvous.service';
import { RendezVous, StatutRendezVous } from 'src/app/models/RendezVous.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    editable: true,
    droppable: true,
    selectable: true,
    eventResizableFromStart: true,
    eventDurationEditable: true,
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear'
    },
    views: {
      multiMonthYear: {
        type: 'multiMonth',
        duration: { months: 12 },
        buttonText: 'Year'
      },
    },
    events: [],
    eventDidMount: this.handleEventMount.bind(this)
  };

  private notificationTimeouts: {[key: number]: any} = {};

  constructor(
    private rendezvousService: RendezvousService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadRendezVous();
  }

  loadRendezVous(): void {
    this.rendezvousService.retrieveAllRendezVous().subscribe({
      next: (rdvs) => {
        const events = rdvs.map(rdv => this.convertRdvToEvent(rdv));
        this.calendarOptions.events = events;
        this.setupReminders(rdvs);
      },
      error: (err) => console.error('Erreur lors du chargement des rendez-vous', err)
    });
  }

  private convertRdvToEvent(rdv: RendezVous): EventInput {
    const startDate = new Date(rdv.dateHeure);
    const endDate = new Date(startDate.getTime() + rdv.duree * 60000);
    
    return {
      id: rdv.idRendezVous.toString(),
      title: `RDV: ${rdv.remarque}`,
      start: startDate,
      end: endDate,
      backgroundColor: this.getEventColor(rdv.statut),
      extendedProps: {
        statut: rdv.statut,
        rappel: rdv.rappel
      }
    };
  }

  private getEventColor(statut: StatutRendezVous): string {
    switch(statut) {
      case StatutRendezVous.ACCEPTE: return '#99e699'; // Vert
      case StatutRendezVous.EN_COURS: return '#99ccff'; // Bleu
      case StatutRendezVous.REFUSE: return '#ff9999'; // Rouge
      default: return '#ffcc99'; // Orange
    }
  }

  private setupReminders(rdvs: RendezVous[]): void {
    // Clear existing timeouts
    Object.values(this.notificationTimeouts).forEach(timeout => clearTimeout(timeout));
    this.notificationTimeouts = {};

    const now = new Date();
    
    rdvs.forEach(rdv => {
      if (rdv.statut === StatutRendezVous.ACCEPTE && rdv.rappel) {
        const rdvDate = new Date(rdv.dateHeure);
        const reminderTime = new Date(rdvDate.getTime() - 10 * 60000); // 10 minutes avant
        
        if (reminderTime > now) {
          const timeout = reminderTime.getTime() - now.getTime();
          
          this.notificationTimeouts[rdv.idRendezVous] = setTimeout(() => {
            this.showReminder(rdv);
          }, timeout);
        }
      }
    });
  }

  private showReminder(rdv: RendezVous): void {
    this.toastr.info(
      `Vous avez un rendez-vous dans 10 minutes: ${rdv.remarque}`,
      'Rappel de rendez-vous',
      {
        timeOut: 10000, // 10 secondes
        positionClass: 'toast-top-right',
        progressBar: true
      }
    );
  }

  private handleEventMount(info: any): void {
    const event = info.event;
    const statut = event.extendedProps.statut;
    const rappel = event.extendedProps.rappel;

    if (statut === StatutRendezVous.ACCEPTE && rappel) {
      // Ajouter une icône de rappel à l'événement
      const reminderIcon = document.createElement('i');
      reminderIcon.className = 'bi bi-alarm ms-2';
      reminderIcon.title = 'Rappel activé (10 min avant)';
      
      const titleEl = info.el.querySelector('.fc-event-title');
      if (titleEl) {
        titleEl.appendChild(reminderIcon);
      }
    }
  }
}