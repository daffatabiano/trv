import { SUB_EMPTY_PROFILE } from '@/services/SUB_DATA/data';

const listTh = ['Profile', 'name', 'email', 'role', 'action'];

export const Th = ({ text }) => {
    return (
        <th
            scope="col"
            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider last:text-right"
        >
            {text}
        </th>
    );
};

const Toggle = (props) => {
    return (
        <label className="inline-flex items-center cursor-pointer p-2">
            <span className="me-3 text-sm font-medium text-rose-400 dark:text-gray-300">
                User
            </span>
            <input
                type="checkbox"
                onClick={props?.setRole}
                value=""
                className="sr-only peer"
                checked={props?.role === 'admin' ? true : false}
            />
            <div className="relative w-11 h-6 bg-rose-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300 peer-checked:peer-focus:ring-emerald-400 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
            <span className="ms-3 text-sm font-medium text-emerald-400 dark:text-gray-300">
                Admin
            </span>
        </label>
    );
};

export default function TableUser(props) {
    return (
        <table className="w-full divide-y divide-gray-200">
            <thead className="bg-stone-400/50 font-medium text-stone-800">
                <tr>
                    {listTh?.map((th) => (
                        <Th text={th} key={th} />
                    ))}
                </tr>
            </thead>
            <tbody className="overflow-y-auto">
                {props[0]?.map((data, i) => (
                    <tr className="border-b overflow-y-auto" key={i}>
                        <td>
                            <img
                                src={
                                    data?.profilePictureUrl
                                        ? data?.profilePictureUrl
                                        : SUB_EMPTY_PROFILE
                                }
                                alt=""
                                className="w-12 h-12 rounded-lg object-cover object-center my-auto ms-4"
                            />
                        </td>
                        <td>{data?.name}</td>
                        <td>{data?.email}</td>
                        <td>
                            <p
                                className={`${
                                    data?.role === 'admin'
                                        ? 'bg-emerald-300/60 text-emerald-700'
                                        : 'bg-rose-300/60 text-rose-700'
                                } text-center w-fit rounded-full py-1 px-4 opacity-50`}
                            >
                                {data?.role === 'admin' ? 'Admin' : 'User'}
                            </p>
                        </td>
                        <td className="text-end ">
                            <Toggle
                                role={data?.role}
                                setRole={() => props?.changeRole(data)}
                            />
                            {/* <button
                                type="button"
                                onClick={() => props?.changeRole(data?.id)}
                                className="bg-amber-300 hover:bg-amber-400  font-bold py-2 px-4 rounded text-stone-50 hover:text-stone-900 me-2"
                            >
                                Change Role
                            </button> */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
