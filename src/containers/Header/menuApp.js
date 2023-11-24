export const adminMenu = [
    { //Quản lý người dùng
        //file này ta render động theo quyền của ngdung lun
        //name này là tên của menu cha
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.crud', link: '/system/user-manage',
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
            },

            {
                name: 'menu.admin.manage-staff', link: '/system/manage-staff',
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin',
            //     //subMenu là menu con 
            //     // subMenus: [
            //     //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
            //     //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
            //     // ]
            // },

            //Quản lý lịch khám bệnh
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',
            }

        ]
    },
    { //Quản lý Phòng khám
        name: 'menu.admin.phongKham', menus: [
            {
                name: 'menu.admin.manage-phongKham', link: '/system/manage-phongKham',
            },
        ]
    },
    { //Quản lý cẩm Gói khám 
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',
            },
        ]
    },
    { //Quản lý cẩm nang Hanbook
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook',
            },
        ]
    },





];


//doctor (staff menu) 71
export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {

                //Quản lý lịch khám bệnh
                //name này là tên của menu cha
                name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule',

            },
        ]

    }
]