class TimeGridView extends FullCalendar.Calendar{
    
    constructor(HTMLELEMENT, options)
    {
        super(HTMLELEMENT, options)
        this.initEventRenderer()
    }

    update(){
        this.render();
    }

    setShowEditForm(appform){
        this.setOption('eventClick', appform.showEditForm.bind(appform)) //Appintment.js
    }

    setShowAddForm(appform){

        let customButtons = {
            appointment: { text: '+ Appointment', click: appform.showAddForm.bind(appform)}
        }
        this.setOption('customButtons', customButtons)

    }

    initEventRenderer(){
        const eventContent = (arg)=> {
            console.log(arg)
            let time = `${arg.timeText}- `
            let name = `<b>${arg.event._def.extendedProps.lastname},  ${arg.event._def.extendedProps.firstname}</b><br>`
            let doctor = ``; let process = ` `
            arg.event._def.extendedProps.doctor.forEach(doc=>{ doctor +=(doc.name + ', '); console.log(doc)})
            arg.event._def.extendedProps.process.forEach(proc=>{ process += ( proc.name+' ')})
            return {html: time + name}
        }

        this.setOption('eventContent', eventContent)
    }


}
