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
                name: 'menu.admin.manage-admin', link: '/system/user-admin',
                //subMenu là menu con 
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            {
                name: 'menu.admin.manage-staff', link: '/system/user-staff',
            },
        ]
    },
    { //Quản lý Phòng khám
        name: 'menu.admin.phongKham', menus: [
            {
                name: 'menu.admin.manage-phongKham', link: '/system/manage-phongKham',
            },
        ]
    },
    { //Quản lý gói Khám 
        name: 'menu.admin.GoiKham', menus: [
            {
                name: 'menu.admin.manage-GoiKham', link: '/system/manage-GoiKham',
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