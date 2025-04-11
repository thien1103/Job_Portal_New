import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import '../../public/featuredJobs.json'
import { toast } from 'react-toastify'

export const AllJobs = () => {

    const tableHeaderCss = "px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
    
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( ()=>{
        try {
            fetch("http://localhost:8080/jobs/all-jobs")
                .then(res => res.json())
                .then(data => {
                    const newData = data.slice(0, 6);
                    setJobs(newData);
                });
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }

    }, [jobs] )
    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>

            <div className='py-1'>
                <div className='w-full '>

                    {/* MAIN TABLE */}
                    <section className="py-1 bg-blueGray-50">
                        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                                <div className="rounded-t mb-0 px-4 py-3 border-0 bg-secondary text-white ">
                                    <div className="flex flex-wrap items-center">
                                        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-center">
                                            <h3 className="font-bold text-base text-blueGray-700">All Posted Jobs</h3>
                                        </div>

                                    </div>
                                </div>

                                <div className="block w-full overflow-x-hidden">
                                    <table className="items-center bg-transparent w-full border-collapse ">
                                        <thead>
                                            <tr>
                                                <th className={tableHeaderCss}>Job Title</th>
                                                <th className={`${tableHeaderCss} hidden md:table-cell`}>Salary</th>
                                                <th className={`${tableHeaderCss} hidden md:table-cell`}>Location</th>
                                                <th className={tableHeaderCss}></th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {jobs.map((job, key) => <RenderTableRows key={key} job={job} />)}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>
            </div>
        </div>
    )
}
function HandlerDeleteJob(id){
    try {
        fetch(`http://localhost:8080/jobs/delete-job/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            // Handle the response data here
            toast.success("Deleted successfully")
        });
    } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Unable to delete")
    }
}


function RenderTableRows({job}){
    const tableDataCss = "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
    return (

        <tr>
            <th className= {`${tableDataCss} text-left text-blueGray-700 px-3 md:px-6`}>
                {job.jobTitle}
            </th>
            <td className={`${tableDataCss} hidden md:table-cell`}>
                {job.location}
            </td>
            <td className={`${tableDataCss} hidden md:table-cell`}>
                {job.salary}
            </td>
            <td className={`flex justify-between ${tableDataCss}`}>
                <button>

                    <box-icon name='edit'/>
                </button>
                <button>
                    
                    <box-icon name='trash' onClick={() => HandlerDeleteJob(job._id)} />
                </button>
            </td>
        </tr>
    )
}