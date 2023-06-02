import { ServiceType } from "./apiSlice"

export const services = {
    common: {
        auth: {
            singIn: 'auth',
            forgotPassword: { endpoint: '/users/forgotpassword', method: "POST" },
            resetPassword: '/users/resetpassword',
            refresh: { endpoint: '/auth/refresh', method: "POST" },
        },
        users: {
            history: { endpoint: '/users/histories', method: "GET" },
            getAll: {},
            getOne: { endpoint: 'users', method: "GET" },
            update: { endpoint: 'users', method: "PUT" },
        },
        dashboards: {
            common: { endpoint: '/commons/dashboards/common' },
            getStudentCount: { endpoint: '/commons/dashboards/get-student-count' },
            registered: { endpoint: '/commons/dashboards/registered' },
            getStudentHonorRoll: { endpoint: '/commons/dashboards/get-student-honor-roll' }
        },
        track: {
            get:
            {
                endpoint: "/tracks",
                method: 'GET'
            }
        },
        contacts: "/commons/contacts",
        documents: "/commons/documents",
        persons: "/commons/persons",
        address: "/commons/address",
        careers: {
            getAll:
            {
                endpoint: "/commons/careers",
                method: 'GET'
            }
        },
        notifications: {
            getAll:
            {
                endpoint: "/commons/notifications",
                method: 'GET'
            },
            update:
            {
                endpoint: "/commons/notifications",
                method: 'PUT'
            }
        },
        academicDegrees: {
            getAll:
            {
                endpoint: "/commons/academic-degrees",
                method: 'GET'
            }
        },
        categories: {
            getAll:
            {
                endpoint: "/commons/categories",
                method: 'GET'
            }
        },
        assessmentTypes: {
            getAll:
            {
                endpoint: "/commons/assessment-types",
                method: 'GET'
            }
        },
        assessments: {
            getAll:
            {
                endpoint: "/commons/assessments",
                method: 'GET'
            }
        }
    },
    academic: {
        classRoom: "academics/class-rooms",
        shift: "academics/shifts",
        period: {
            getAll:
            {
                endpoint: "academics/periods",
                method: 'GET'
            }
        },
        class: {
            getAll:
            {
                endpoint: "academics/class",
                method: 'GET'
            }
        },

        discipline: {
            getAll:
            {
                endpoint: "commons/disciplines",
                method: 'GET'
            }
        },
        timeTables:{
            getAll:
            {
                endpoint:  "commons/time-tables",
                method: 'GET'
            }
        },
        course: {
            getAll:
            {
                endpoint: "commons/courses",
                method: 'GET'
            }
        },
        curricularPlan: {
            getAll:
            {
                endpoint: "commons/curricular-plans",
                method: 'GET'
            },
            getOne:
            {
                endpoint: "commons/curricular-plans",
                method: 'GET'
            }
        },
        curricularPlanItem: {
            getAll:
            {
                endpoint: "commons/plan-items",
                method: 'GET'
            },
            update:
            {
                endpoint: "commons/plan-items",
                method: 'PUT'
            },
            create:
            {
                endpoint: "commons/plan-items",
                method: 'POST'
            },
            delete:
            {
                endpoint: "commons/plan-items",
                method: 'DELETE'
            },
        }

    },
    student: {
        enrollmentConfirmations: 'students/enrollment-confirmations',
        enrollment: {
            getAll:
            {
                endpoint: 'students/enrollments',
                method: 'GET'
            },
            create:
            {
                endpoint: 'students/enrollments',
                method: 'POST'
            }
        },
        students: {
            getAll:
            {
                endpoint: 'students',
                method: 'GET'
            }
        },
    },
    staff: {
        enrollmentConfirmations: 'students/enrollment-confirmations',
        enrollment: 'students/enrollments',
        staff: {
            update: { endpoint: 'staffs', method: 'PUT' },
            get: { endpoint: 'staffs', method: 'GET' }
        }
    },
    helpDesk:{
        
        events: {
            get:
            {
                endpoint: "/commons/events",
                method: 'GET'
            },
            create:
            {
                endpoint: "/commons/events",
                method: 'POST'
            },
            update:
            {
                endpoint: "/commons/events",
                method: 'PUT'
            }
        },
        
        eventSchedules: {
            get:
            {
                endpoint: "/commons/event-schedules",
                method: 'GET'
            },
            create:
            {
                endpoint: "/commons/event-schedules",
                method: 'POST'
            },
            update:
            {
                endpoint: "/commons/event-schedules",
                method: 'PUT'
            }
        },
        
        eventTypes: {
            getAll:
            {
                endpoint: "/commons/event-types",
                method: 'GET'
            }
        },
        tickets: {
            getAll:
            {
                endpoint: "/commons/tickets",
                method: 'GET'
            },
            create:
            {
                endpoint: "/commons/tickets",
                method: 'POST'
            },
            update:
            {
                endpoint: "/commons/tickets",
                method: 'PUT'
            }
        },
        ticketStates: {
            get:
            {
                endpoint: "/commons/ticket-states",
                method: 'GET'
            }
        },
        ticketTypes: {
            getAll:
            {
                endpoint: "/commons/ticket-types",
                method: 'GET'
            }
        }
    }

}
