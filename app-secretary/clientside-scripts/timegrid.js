class TimeGridView extends FullCalendar.Calendar{
    
    constructor(HTMLELEMENT, options)
    {
        super(HTMLELEMENT, options)
        this.init()
    }

    init(){
        this.setOption('slotMinTime', '06:00:00')
        this.setOption('slotMaxTime',  '20:00:00')
        this.setOption('eventClick', Appointment.showEditForm)
        let customButtons = {
            appointment: { text: 'Appointment', click: Appointment.showAddForm},
            doctor: { text: 'Doctors', click: function() { alert('clicked the custom button!'); } },
            process: { text: 'Procedures', click: function() { alert('clicked the custom button!'); } },
        }
        this.setOption('customButtons', customButtons)
        
    }

    update(){
        this.render();
    }

}
