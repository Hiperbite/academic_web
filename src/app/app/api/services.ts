import { ServiceType } from "./apiSlice"

export const services = {
    common: {
        auth: {
            singIn: 'auth',
            forgotPassword: { endpoint: '/users/forgotpassword', method: "POST" },
            resetPassword: '/users/resetpassword',
            refresh:{ endpoint: '/auth/refresh', method: "POST" },
        },
        users: {
            history: { endpoint: '/users/histories', method: "GET" },
            getAll: {},
            getOne: { endpoint: 'users', method: "GET" },
            update: { endpoint: 'users', method: "PUT" },
        },
        track: "tracks",
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
        timeTables: "commons/time-tables",
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
        }

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
            update: { endpoint: 'staffs', method: 'PUT' }
        }
    }
}
