import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    FolderIcon,
    HomeIcon,
    UsersIcon,
    PlusIcon
} from '@heroicons/react/24/outline'
import {useState} from "react";
import {Link} from "react-router-dom";
import { useDispatch} from "react-redux";
import { openModal, openProfile} from "../store/modalSlice";
import {UserCircleIcon} from "@heroicons/react/16/solid";


const navigation = [
    { type:'create', name: 'Add Task', icon:PlusIcon, count:'40', current: false},
    { name: 'Today', href: '/home', icon: HomeIcon, count: '5', current: true },
    { name: 'Upcoming', href: '/upcoming', icon: UsersIcon, current: false },
    { name: 'Flagged task', href: '/flagged', icon: FolderIcon, count: '12', current: false },

]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SideBar = () => {
    const dispatch = useDispatch();
    const [navItems, setNavItems] = useState(navigation);
    const handleNavClick = (clickedItem) => {
        setNavItems(navItems.map(item => ({
            ...item,
            current: item.name === clickedItem.name
        })));
    };
    return (
        <div className="flex  flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 w-1/5">
            <div className="flex h-16 shrink-0 items-center -mx-2 space-y-1">
                <button
                    onClick={() => {dispatch(openProfile());

                    }}
                    className="group flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                >
                    <UserCircleIcon
                        aria-hidden="true"
                        className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                    />
                    <span>username</span>
                </button>
            </div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {navItems.map((item) =>
                                item.type === 'create' ? (
                                  <li key={item.name}>
                                      <button
                                          onClick={() => {dispatch(openModal());
                                              handleNavClick(item)
                                      }}
                                          className="group flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white"
                                      >
                                          <item.icon
                                              aria-hidden="true"
                                              className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                                          />
                                          {item.name}

                                      {item.count ? (
                                          <span
                                              aria-hidden="true"
                                              className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-indigo-600 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-indigo-500"
                                          >
                                            {item.count}
                                          </span>
                                      ) : null}
                                      </button>
                                  </li>
                                ) :(
                                <li key={item.name}>
                                    <Link to={item.href}
                                        onClick={(e) => {
                                            handleNavClick(item);
                                        }}
                                        className={classNames(
                                            item.current
                                                ? 'bg-indigo-700 text-white'
                                                : 'text-indigo-200 hover:bg-indigo-700 hover:text-white',
                                            'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                        )}
                                    >
                                        <item.icon
                                            aria-hidden="true"
                                            className={classNames(
                                                item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                                                'h-6 w-6 shrink-0',
                                            )}
                                        />
                                        {item.name}
                                        {item.count ? (
                                            <span
                                                aria-hidden="true"
                                                className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-indigo-600 px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-white ring-1 ring-inset ring-indigo-500"
                                            >
                                            {item.count}
                                          </span>
                                        ) : null}
                                    </Link>

                                </li>
                            ))}
                        </ul>
                    </li>


                </ul>
            </nav>

        </div>
    )
}
export default SideBar;
