<template>
    <div class="h-[80%] max-h-[80%] flex flex-col  pt-8">
        <div class="flex justify-between  h-[10%] gap-4 text-sm">



            <div class="flex items-center gap-4">
                <AddEmployer @created="push($event)" :organization_id="props.organization.id"></AddEmployer>
                <select @change="actions($event.target.value)" class="w-fit h-fit p-2 rounded-md">
                    <option selected disabled>Actions</option>
                    <option value="remove">remove</option>
                    <option value="delete">Delete</option>
                </select>
            </div>




            <div class="flex gap-4">

                <div @click="excelExport()"
                    class="text-sm capitalize cursor-pointer bg-[#302E81] w-fit h-fit py-2 px-8 rounded-md placeholder border border-gray-200 text-white">
                    Export
                </div>





                <ExemptionsVue :settings="props.organization.settings"></ExemptionsVue>
                <div class="bg-white w-fit h-fit p-2 rounded-md placeholder border border-gray-200">
                    <span>Total Tax:</span>
                    <b>{{ totalTax.toLocaleString('en-US') }}</b>
                </div>
            </div>
        </div>
        <div
            class="h-[90%]  bg-white overflow-y-auto flex flex-col justify-between p-6 rounded-md border border-gray-200 table-body gap-4">
            <div class="fixTableHead">
                <table class="w-full !text-sm ">
                    <thead class="border-b border-gray-300 ">
                        <tr>
                            <th class=" p-3 ">
                                <div class="flex gap-4 items-center">
                                    <input class="marker_all" @change="mark_all($event.target)" type="checkbox">
                                    Worker's name
                                </div>
                            </th>
                            <th class=" p-3 ">
                                Salary
                            </th>
                            <th class=" p-3 ">
                                Months
                            </th>
                            <th class=" p-3 ">
                                Total pay
                            </th>
                            <th class=" p-3 ">
                                Consolidated Relief Allowance
                            </th>

                            <th class=" p-3 ">
                                Earned Income
                            </th>
                            <th class=" p-3 ">
                                Tax Payable
                            </th>

                            <th class="px-3"></th>


                        </tr>
                    </thead>

                    <tbody class="text-center border-b border-gray-300" ref="tableBody">
                        <tr v-for="(v, i) in sheets" :key="i"
                            class="border-b border-gray-300 hover:bg-gray-300 cursor-pointer relative">
                            <td class=" p-3">
                                <div class="flex gap-4 items-center">
                                    <input class="marker" @change="mark($event.target, data.marked, v.id)" type="checkbox">
                                    <arrow-down class="arrow-down" @click="open($event.target, v)"></arrow-down>
                                    <arrow-up class="hidden arrow-up " @click="close($event.target, v)"></arrow-up>
                                    {{ v.names }}
                                </div>
                            </td>
                            <td class="">
                                {{ v.salary }}
                            </td>
                            <td class="">
                                {{ v.months }}
                            </td>
                            <td class="">
                                {{ v.total_pay.toLocaleString('en-US') }}
                            </td>
                            <td class="">
                                {{ v.consolidated.toLocaleString('en-US') }}
                            </td>

                            <td class="">
                                {{ v.earned_income.toLocaleString('en-US') }}
                            </td>
                            <td class="">
                                {{ v.tax_payable.toLocaleString('en-US') }}
                            </td>
                            <td class="px-3 select-none">

                                <dots :id="'toggleButton' + i" @click="toggle(i)" class="toggleButton"></dots>

                                <!-- Dropdown menu -->
                                <div :id="'toggleOptions' + i"
                                    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                                    <ul class="py-2 text-sm text-gray-700 " aria-labelledby="dropdownDefault">
                                        <li @click="remove(i, v)">
                                            <a class="block px-4 py-2 hover:bg-gray-100 font-semibold ">Remove</a>
                                        </li>
                                        <li>
                                            <a @click="destroy(v, i)"
                                                class="block px-4 py-2 hover:bg-gray-100 text-red-600  font-semibold ">Delete</a>
                                        </li>
                                    </ul>
                                </div>

                            </td>
                        </tr>
                        <tr ref="adjustment" class="hidden border-b border-gray-300">
                            <td colspan="8" class="">
                                <adjustments :adjust="data.adjust" :organization_id="props.organization.id"></adjustments>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div class="flex justify-between">


                <!-- <div @click="calculate()"
                    class="capitalize cursor-pointer bg-[#302E81] w-fit h-fit p-2 rounded-md placeholder border border-gray-200 text-white">
                    calculate
                </div>

                <div @click="calculate()"
                    class="capitalize cursor-pointer bg-[#302E81] w-fit h-fit p-2 rounded-md placeholder border border-gray-200 text-white">
                    calculate
                </div> -->

            </div>
        </div>

    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import $ from 'jquery'
import axios from 'axios'
import { Dropdown } from 'flowbite';
import { mark, unmark } from "@/js/helpers.js"
// Icons
import arrowDown from '@/components/icons/arrow-down.vue';
import arrowUp from '@/components/icons/arrow-up.vue';

import dots from '@/components/icons/dots.vue';

// Reusables
import adjustments from '@/components/reusables/adjustments.vue';
import ExemptionsVue from '@/components/reusables/exemptions.vue';
import AddEmployer from '@/components/reusables/addEmployer.vue';

const props = defineProps({
    organization: Object
})

const totalTax = computed(() => {
    if (Object.keys(sheets.value) < 1) {
        return 0;
    }

    let sum = 0;

    sheets.value.forEach(v => {
        sum += v.tax_payable
    })
    return sum;
})

const sheets = ref({});

// Html's
const tableBody = ref();
const adjustment = ref();

const data = ref({
    adjust: {
        data: {}
    },
    isAjusting: false,
    marked: [],
});



function push(e) {
    sheets.value.push(e)
}


function open(e, d) {
    const a = $(adjustment.value);
    a.insertAfter($(e).parents('tr'))
    a.show()

    // Close if pre opened
    const v = $('.arrow-up:visible')

    for (let i = 0; i < v.length; i++) {
        $(v[i]).hide();
        $(v[i]).prev().show();
    }

    let svg = $(e)
    if ($(e).parents('.arrow-down').length > 0) {
        svg = $(e).parents('.arrow-down')
    }

    svg.hide()
    svg.next().show()

    data.value.adjust.data = d
    data.value.isAjusting = true
}


function close(e) {
    const a = $(adjustment.value);
    const t = $(tableBody.value);

    //
    a.insertAfter(t)
    a.hide()


    let svg = $(e)
    if ($(e).parents('.arrow-up').length > 0) {
        svg = $(e).parents('.arrow-up')
    }

    svg.hide()
    svg.prev().show()

    data.value.isAjusting = false
}

function mark_all(e) {
    if (!$(e).is(":checked")) {
        data.value.marked = [];
        $('.marker').prop('checked', false)

    } else {
        sheets.value.forEach(v => {
            data.value.marked.push(v.id)
        });
        $('.marker').prop('checked', true)
    }
}

function unmark_all() {
    data.value.marked = [];
    $('.marker').prop('checked', false)
    $('.marker_all').prop('checked', false)
}

function actions(a) {
    if (a == "delete") {
        destroy_multiple();
    }
    if (a == "remove") {
        remove_multiple();
    }
}
function destroy_multiple() {
    axios.post('api/employee/destroy', { ids: data.value.marked, organization_id: props.organization.id })
        .then((e) => {
            remove_multiple()
        })
        .catch((e) => {
            console.log(e)
        })
}

function remove_multiple() {
    const a = [];
    const e = JSON.parse(JSON.stringify(sheets.value))
    for (let i = 0; i < e.length; i++) {
        if (!data.value.marked.includes(e[i].id)) {
            a.push(e[i])
        } else {
            $($('.marker')[i]).prop('checked', false)
        }
    }
    sheets.value = a
}

function destroy(item, index) {
    axios.post('api/employee/delete', { id: item.id, organization_id: props.organization.id })
        .then((e) => {
            remove(index, item);
        })
        .catch((e) => {
            console.log(e)
            toggle(index)
        })
}

function remove(i, item) {

    sheets.value.splice(i, 1)
    toggle(i);

    // Clear if pre marked
    unmark(data.value.marked, item.id)

    // Unmark all after every action
    unmark_all()
}

function toggle(e) {
    let body = $("#toggleOptions" + e)[0]
    let button = $("#toggleButton" + e)[0]

    const dropdown = new Dropdown(
        body,
        button,
    )
    if ($("#toggleOptions" + e).is(":visible")) {
        dropdown.hide()
    } else {
        dropdown.show()
    }
}


function setBody() {
    $(function () {

        const tBody = document.querySelector('.table-body').clientHeight
        $('.fixTableHead').css('height', (parseInt(tBody) - 30) + 'px')
    });
}

function excelExport() {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = JSON.parse(JSON.stringify(sheets.value));
    var CSV = '';
    //Set Report title in first row or line

    CSV += "Total tax" + "," + totalTax.value + '\r\n\n';

    //This condition will generate the Label/Header
    delete arrData[0].exemptions;
    var row = "";

    //This loop will extract the label from 1st index of on array
    for (var index in arrData[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ',';
    }

    row = row.slice(0, -1);

    //append Label row with line break
    CSV += row + '\r\n';


    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {

        delete arrData[i].exemptions;

        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",'
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += "Taxedme Excel".replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



onMounted(() => {
    // Calculate
    axios.post('api/tax/calculate', { organization_id: props.organization.id })
        .then((e) => {
            sheets.value = e.data.data;
        })
        .catch((e) => {
            console.log(e)
        })

    setBody();

    addEventListener('resize', () => {
        setBody();
    })
})
</script>



<style scoped> .fixTableHead {
     overflow: auto;
     height: 200px;
 }

 .fixTableHead thead th {
     position: sticky;
     top: 0;
     z-index: 40;
 }

 table {
     border-collapse: collapse;
     width: 100%;
 }

 th {
     background: #c8c8c8;
 }
</style>