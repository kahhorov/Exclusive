import { FaRegStar, FaRegTimesCircle, FaRegUser, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa'
import { Dropdown, IconButton } from 'rsuite'

const menuItems = [
    { id: 1, text: "Manage My Account", icon: <FaRegUser /> },
    { id: 2, text: "My Order", icon: <FaShoppingBag /> },
    { id: 3, text: "My Cancellations", icon: <FaRegTimesCircle /> },
    { id: 4, text: "My Reviews", icon: <FaRegStar /> },
]

function CustomMenu() {
    return (
        <Dropdown
            placement='bottomEnd'
            menuStyle={{ minWidth: 220 }}
            renderToggle={(props, ref) => (
                <IconButton {...props} ref={ref} circle icon={<FaRegUser size={16} />} />
            )}
        >
            {menuItems.map((item) => (
                <Dropdown.Item key={item.id} icon={item.icon}>
                    {item.text}
                </Dropdown.Item>
            ))}
            <Dropdown.Separator />
            <Dropdown.Item icon={<FaSignOutAlt />}>Logout</Dropdown.Item>
        </Dropdown>
    )
}

export default CustomMenu
