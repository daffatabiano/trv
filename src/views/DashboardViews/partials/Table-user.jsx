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
                            <button
                                type="button"
                                onClick={() => props?.changeRole(data?.id)}
                                className="bg-amber-300 hover:bg-amber-400  font-bold py-2 px-4 rounded text-stone-50 hover:text-stone-900 me-2"
                            >
                                Change Role
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
