import { ServiceType } from "./apiSlice"

export const services = {
    common: {
        auth: {
            singIn: 'auth',
            forgotPassword: { endpoint: '/users/forgotpassword', method: "POST" },
            resetPassword: '/users/resetpassword',
        },
        users: {
            getAll: {},
            getOne: { endpoint: 'users', method: "GET" },
            update: { endpoint: 'users', method: "PUT" },
        },
        track: "tracks",
        contacts: "/commons/contacts",
        documents: "/commons/documents",
        persons: "/commons/persons",
        address: "/commons/address",
        careers: "/commons/careers",
        categories: "/commons/categories",
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
        timeTables: "commons/time-tables",
        course: "commons/courses",
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
        curricularPlanItem: "commons/plan-items",

    },
    student: {
        enrollmentConfirmations: 'students/enrollment-confirmations',
        enrollment: {
            getAll:
            {
                endpoint: 'students/enrollments',
                method: 'GET'
            }
        },
        students: 'students'
    },
    staff: {
        enrollmentConfirmations: 'students/enrollment-confirmations',
        enrollment: 'students/enrollments',
        staff: 'staffs'
    }
}
