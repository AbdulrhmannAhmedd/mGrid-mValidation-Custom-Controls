// Employee Grid Configuration - Global for mGrid compatibility
var employeesGrid = {
    Url: 'http://localhost:5142/api/Employee/GetEmployees',
    requestType: 'GET',
    sortingNotificator: true,
    sortColumn: 'employeeName',
    sortOrder: 'ASC',
    pageRowCounts: 5,
    pageIndex: 0,
    Table: {
        ID: 'tbl_showEmps',
    },
    Columns: [
        GridHelper.getGridColumnCheckBoxObj("", "", "idNumber"),
        GridHelper.getGridColumnObj('idNumber', "رقم الهوية", false, "", 15, true),
        GridHelper.getGridColumnObj('employeeName', "اسم الموظف", false, "", 25, true),
        GridHelper.getGridColumnObj('mobileNumber', "رقم الجوال", false, "", 15, true),
        GridHelper.getGridColumnObj('maritalStatus', "الحالة الاجتماعية", false, "", 15, true),
        GridHelper.getGridColumnObj('nationality', "الجنسية", false, "", 15, true),
        GridHelper.getGridColumnObj('email', "البريد الإلكتروني", false, "", 15, true)
    ],
    Empty: { ID: 'div_empty_show', Text: 'لايوجد نتائج متاحة' },
    Pager: {
        Container: { ID: 'div_show_Pager' },
        lastButton: { ID: 'btn_show_last' },
        nextButton: { ID: 'btn_show_next' },
        backButton: { ID: 'btn_show_back' },
        firstButton: { ID: 'btn_show_first' },
        currentPageText: { ID: 'txt_show_Page' },
        rowsCountLabel: { ID: 'spn_show_total' },
        pagesCountLabel: { ID: 'spn_show_grid_paging' },
    },
    onGridRowsComplete: function () {
        console.log('Employee grid loaded successfully');

        mScript.mSingleCheck({
            Container: 'tbl_showEmps', // Use the table ID as container
            flagName: 'selectedFlag',
            OnCheck: function (data) { 
                // data.Element is the checkbox element that was checked
                EmpApp.selectedId = EmpApp.extractRowId(data.Element);
                EmpApp.handleCheckboxSelection();
            },
            OnUnCheck: function (data) { 
                // data.Element is the checkbox element that was unchecked
                var uncheckedId = EmpApp.extractRowId(data.Element);
                if (EmpApp.selectedId === uncheckedId) {
                    EmpApp.selectedId = null;
                }
                EmpApp.handleCheckboxSelection();
            }
        });

        // After grid reload/pagination, restore previous selection if present
        EmpApp.restoreSelection();
    },
};

// Employee Management Application
var EmpApp = {
    // Search Configuration
    config: {
        searchText: '',
        searchField: 'employeeName'
    },

    // Persist selected row across pagination
    selectedId: null,

    // Helper to get checkbox unique id (grid renders as cb_Select_<UniqueID>)
    extractRowId: function(el) {
        return el && el.id ? el.id : null;
    },

    // Employee Form Validation Configuration using mValidation
    employeeValidation: [
        // First Name
        {
            Element: 'firstName',
            spn_A: 'spnA_firstName',
            spn_E: 'spnE_firstName',
            validationScheme: {
                Required: {
                    Value: '',
                    Msg: 'برجاء ادخال الاسم الأول واسم الأب واسم الجد واسم العائلة'
                },
                Length: {
                    maxLength: {
                        Value: 15,
                        Msg: 'الاسم الأول يجب ألا يزيد عن 15 حرف'
                    }
                }
            }
        },
        // Father Name
        {
            Element: 'fatherName',
            spn_A: 'spnA_fatherName',
            spn_E: 'spnE_fatherName',
            validationScheme: {
                Required: {
                    Value: '',
                    Msg: 'برجاء ادخال الاسم الأول واسم الأب واسم الجد واسم العائلة'
                },
                Length: {
                    maxLength: {
                        Value: 15,
                        Msg: 'اسم الأب يجب ألا يزيد عن 15 حرف'
                    }
                }
            }
        },
        // Grandfather Name
        {
            Element: 'grandfatherName',
            spn_A: 'spnA_grandfatherName',
            spn_E: 'spnE_grandfatherName',
            validationScheme: {
                Required: {
                    Value: '',
                    Msg: 'برجاء ادخال الاسم الأول واسم الأب واسم الجد واسم العائلة'
                },
                Length: {
                    maxLength: {
                        Value: 15,
                        Msg: 'اسم الجد يجب ألا يزيد عن 15 حرف'
                    }
                }
            }
        },
        // Family Name
        {
            Element: 'familyName',
            spn_A: 'spnA_familyName',
            spn_E: 'spnE_familyName',
            validationScheme: {
                Required: {
                    Value: '',
                    Msg: 'برجاء ادخال الاسم الأول واسم الأب واسم الجد واسم العائلة'
                },
                Length: {
                    maxLength: {
                        Value: 15,
                        Msg: 'اسم العائلة يجب ألا يزيد عن 15 حرف'
                    }
                }
            }
        },
        // Birth Date
        {
            Element: 'birthDate',
            spn_A: 'spnA_birthDate',
            spn_E: 'spnE_birthDate',
            validationScheme: {
                anyDate: {
                    isRequired: true,
                    requiredMessage: 'برجاء ادخال تاريخ الميلاد',
                    invalidMessage: 'برجاء ادخال تاريخ ميلاد صحيح',
                    minDate: '1970-01-01',
                    maxDate: '2001-12-31',
                    minRangeMessage: 'لا يمكن أن يكون تاريخ الميلاد قبل 1970',
                    maxRangeMessage: 'لا يمكن أن يكون تاريخ الميلاد بعد 2001'
                }
            }
        },
        // Bank Account
        {
            Element: 'bankAccount',
            spn_A: 'spnA_bankAccount',
            spn_E: 'spnE_bankAccount',
            validationScheme: {
                Required: {
                    Value: '',
                    Msg: 'برجاء ادخال رقم الحساب البنكي'
                },
                Length: {
                    maxLength: {
                        Value: 30,
                        Msg: 'رقم الحساب البنكي يجب ألا يزيد عن 30 رقم'
                    }
                }
            }
        },
        // ID Number
        {
            Element: 'idNumber',
            spn_A: 'spnA_idNumber',
            spn_E: 'spnE_idNumber',
            validationScheme: {
                Required: {
                    Value: '',
                    Msg: 'برجاء ادخال رقم الهوية'
                },
                Length: {
                    minLength: {
                        Value: 10,
                        Msg: 'رقم الهوية يجب أن يكون 10 أرقام'
                    },
                    maxLength: {
                        Value: 10,
                        Msg: 'رقم الهوية يجب ألا يزيد عن 10 أرقام'
                    }
                },
                // checkExist: {
                //     Url: 'http://localhost:5142/api/Employee/CheckIdExists', // simulate api call
                //     Data: function() {
                //         return JSON.stringify({ idNumber: document.getElementById('idNumber').value });
                //     },
                //     successValue: 'false',
                //     Msg: 'عفواً رقم الهوية مكرر'
                // }
            }
        },
        // Nationality
        {
            Element: 'nationality',
            spn_A: 'spnA_nationality',
            spn_E: 'spnE_nationality',
            validationScheme: {
                Required: {
                    Value: '',
                    Msg: 'برجاء اختيار الجنسية'
                }
            }
        },
        // Mobile Number
        {
            Element: 'mobileNumber',
            spn_A: 'spnA_mobileNumber',
            spn_E: 'spnE_mobileNumber',
            validationScheme: {
                Required: {
                    Value: '',
                    Msg: 'برجاء ادخال رقم الجوال'
                },
                Length: {
                    maxLength: {
                        Value: 12,
                        Msg: 'رقم الجوال يجب ألا يزيد عن 12 رقم'
                    }
                },
                Pattern: {
                    Value: '^966[0-9]{9}$',
                    Msg: 'عفواً رقم الجوال يجب أن يبدأ بـ 966'
                }
            }
        },
        // Email (Optional)
        {
            Element: 'email',
            spn_A: 'spnA_email',
            spn_E: 'spnE_email',
            validationScheme: {
                Length: {
                    maxLength: {
                        Value: 50,
                        Msg: 'البريد الإلكتروني يجب ألا يزيد عن 50 حرف'
                    }
                },
                Pattern: {
                    Value: 'EMAIL',
                    Msg: 'عفواً صيغة البريد الإلكتروني غير صحيحة'
                }
            }
        },
        // Education (Optional)
        {
            Element: 'education',
            spn_A: 'spnA_education',
            spn_E: 'spnE_education',
            validationScheme: {
                Length: {
                    maxLength: {
                        Value: 200,
                        Msg: 'المؤهل الدراسي يجب ألا يزيد عن 200 حرف'
                    }
                }
            }
        },
        // Employment Date
        {
            Element: 'employmentDate',
            spn_A: 'spnA_employmentDate',
            spn_E: 'spnE_employmentDate',
            validationScheme: {
                anyDate: {
                    isRequired: true,
                    requiredMessage: 'برجاء ادخال تاريخ التعيين',
                    maxDate: function() {
                        var d = new Date();
                        var m = (d.getMonth() + 1).toString().padStart(2, '0');
                        var day = d.getDate().toString().padStart(2, '0');
                        return d.getFullYear() + '-' + m + '-' + day;
                    },
                    maxRangeMessage: 'لا يمكن أن يكون تاريخ التعيين بعد تاريخ اليوم'
                },
                vFunction: {
                    Func: function() {
                        var birthDate = document.getElementById('birthDate').value;
                        var employmentDate = document.getElementById('employmentDate').value;
                        
                        if (birthDate && employmentDate) {
                            var birth = new Date(birthDate);
                            var employment = new Date(employmentDate);
                            return employment > birth;
                        }
                        return true;
                    },
                    Msg: 'لا يمكن أن يكون تاريخ التعيين قبل تاريخ الميلاد'
                }
            }
        }
    ],

    // Search functionality - pass search parameters to mGrid
    performSearch: function() {
        // Get search values
        this.config.searchText = document.getElementById('searchInput').value.trim();
        this.config.searchField = document.getElementById('searchCriteria').value;
        
        console.log('Search triggered:', this.config.searchText, 'in field:', this.config.searchField);
        
        // Reset to first page when searching
        employeesGrid.pageIndex = 0;
        
        // Pass search parameters to mGrid in the format it expects
        var searchParams = {
            searchText: this.config.searchText,
            searchField: this.config.searchField
        };
        
        Reload(searchParams, employeesGrid);
        
        // Re-style pagination buttons after reload
        setTimeout(() => {
            stylePaginationButtons();
        }, 100);
    },

    // Clear search and show all results
    clearSearch: function() {
        // Clear the search input
        document.getElementById('searchInput').value = '';
        
        // Reset search criteria to default
        document.getElementById('searchCriteria').value = 'employeeName';
        
        // Reset to first page
        employeesGrid.pageIndex = 0;
        
        // Clear search parameters and reload with empty search
        this.config.searchText = '';
        this.config.searchField = 'employeeName';
        
        console.log('Search cleared - showing all results');
        
        // Reload with empty search parameters to show all results
        Reload({}, employeesGrid);
        
        // Re-style pagination buttons after reload
        setTimeout(() => {
            stylePaginationButtons();
        }, 100);
    },

    // Handle checkbox selection - enable/disable action buttons
    handleCheckboxSelection: function() {
        // Check if any checkbox is actually checked
        var anyChecked = document.querySelector('#tbl_showEmps input[type="checkbox"]:checked') !== null;
        
        // Enable/disable the action buttons
        var viewBtn = document.getElementById('btn_view');
        var editBtn = document.getElementById('btn_edit');
        var deleteBtn = document.getElementById('btn_delete');
        
        if (viewBtn) viewBtn.disabled = !anyChecked;
        if (editBtn) editBtn.disabled = !anyChecked;
        if (deleteBtn) deleteBtn.disabled = !anyChecked;
    },

    // Restore selection by re-checking the checkbox that matches selectedId
    restoreSelection: function() {
        if (!this.selectedId) {
            this.handleCheckboxSelection();
            return;
        }
        var cb = document.getElementById(this.selectedId);
        if (cb) {
            cb.click();
        }
        this.handleCheckboxSelection();
    },

    // Form Management Methods
    initEmployeeForm: function() {
        var self = this;
        
        // Save button click
        document.getElementById('saveEmployee').addEventListener('click', function() {
            self.saveEmployee();
        });
        
        // Modal clear on close
        $('#employeeModal').on('hidden.bs.modal', function () {
            self.clearForm();
        });
        
        // Form field blur events for validation
        this.bindValidationEvents();
    },
    
    bindValidationEvents: function() {
        var self = this;
        
        // Bind blur events for validation
        var fields = [
          "firstName",
          "fatherName",
          "grandfatherName",
          "familyName",
          "birthDate",
          "bankAccount",
          "idNumber",
          "nationality",
          "mobileNumber",
          "email",
          "education",
          "employmentDate",
        ];
        
        fields.forEach(function(fieldId) {
            var element = document.getElementById(fieldId);
            if (element) {
                element.addEventListener('blur', function() {
                    validateById(fieldId, self.employeeValidation, 1);
                });
            }
        });
        
        // Special handling for gender radio buttons
        document.querySelectorAll('input[name="gender"]').forEach(function(radio) {
            radio.addEventListener('change', function() {
                validateById('gender', self.employeeValidation, 1);
            });
        });
    },
    
    saveEmployee: function() {
        // Validate all fields
        if (validateAll(this.employeeValidation, 1)) {
            // If validation passes, collect form data
            var formData = this.collectFormData();
            
            console.log('Employee data to save:', formData);
            
            // Here you would normally send to your API
            alert('تم حفظ بيانات الموظف بنجاح!');
            
            // Close modal and refresh grid
            $('#employeeModal').modal('hide');
            // Reload the grid to show new employee
            Reload({}, employeesGrid);
        }
    },
    
    collectFormData: function() {
    return {
            firstName: document.getElementById('firstName').value,
            fatherName: document.getElementById('fatherName').value,
            grandfatherName: document.getElementById('grandfatherName').value,
            familyName: document.getElementById('familyName').value,
            birthDate: document.getElementById('birthDate').value,
            gender: document.querySelector('input[name="gender"]:checked')?.value || '',
            idNumber: document.getElementById('idNumber').value,
            mobileNumber: document.getElementById('mobileNumber').value,
            email: document.getElementById('email').value,
            nationality: document.getElementById('nationality').value,
            bankName: document.getElementById('bankName').value,
            bankAccount: document.getElementById('bankAccount').value,
            maritalStatus: document.getElementById('maritalStatus').value,
            education: document.getElementById('education').value,
            employmentDate: document.getElementById('employmentDate').value
        };
    },
    
    clearForm: function() {
        // Clear all form fields
        document.getElementById('employeeForm').reset();
        
        // Clear all validation messages
        clearValidation(this.employeeValidation);
    },

    // Initialize all functionality
    init: function() {
        var self = this;
        
        // Add search event handlers - search on button click and Enter key
        document.getElementById('searchBtn').addEventListener('click', function() {
            self.performSearch();
        });
        
        // Clear search and show all results
        document.getElementById('clearSearchBtn').addEventListener('click', function() {
            self.clearSearch();
        });
        
        // Edit button click
        document.getElementById('btn_edit').addEventListener('click', function() {
            self.editEmployee();
        });
        
        // Delete button click
        document.getElementById('btn_delete').addEventListener('click', function() {
            self.deleteEmployee();
        });
        
        // Search on Enter key press in input field
        document.getElementById('searchInput').addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                self.performSearch();
            }
        });
        
        // Optional: Search when criteria changes (you can remove this if you don't want it)
        document.getElementById('searchCriteria').addEventListener('change', function() {
            // Only search if there's text in the input
            if (document.getElementById('searchInput').value.trim() !== '') {
                self.performSearch();
            }
        });
        
        // Initialize employee form
        this.initEmployeeForm();
    },

    restoreSelection: function() {
        if (this.selectedId) {
            var checkbox = document.getElementById(this.selectedId);
            if (checkbox) {
                checkbox.checked = true;
                // Ensure the checkbox is visible and focused if needed
                checkbox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                checkbox.focus();
            }
        }
    }
};


// Function to style pagination buttons
function stylePaginationButtons() {
    const pagerDiv = document.getElementById('div_show_Pager');
    if (pagerDiv) {
        // Force flexbox layout
        pagerDiv.style.display = 'flex';
        pagerDiv.style.alignItems = 'center';
        pagerDiv.style.justifyContent = 'center';
        pagerDiv.style.gap = '10px';
        pagerDiv.style.flexDirection = 'row';
        pagerDiv.style.flexWrap = 'wrap';
        pagerDiv.style.textAlign = 'center';
        pagerDiv.style.listStyle = 'none';
        
        // Handle any ul/li structure
        const ulElements = pagerDiv.querySelectorAll('ul');
        ulElements.forEach(ul => {
            ul.style.display = 'flex';
            ul.style.alignItems = 'center';
            ul.style.justifyContent = 'center';
            ul.style.gap = '10px';
            ul.style.flexWrap = 'wrap';
            ul.style.margin = '0';
            ul.style.padding = '0';
            ul.style.listStyle = 'none';
        });
        
        const liElements = pagerDiv.querySelectorAll('li');
        liElements.forEach(li => {
            li.style.display = 'inline';
            li.style.listStyle = 'none';
            li.style.margin = '0';
            li.style.padding = '0';
            li.style.float = 'none';
        });
        
        // Style all buttons
        const buttons = pagerDiv.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            button.style.color = 'white';
            button.style.border = 'none';
            button.style.padding = '8px 16px';
            button.style.borderRadius = '6px';
            button.style.fontSize = '13px';
            button.style.fontWeight = '600';
            button.style.cursor = 'pointer';
            button.style.minWidth = '70px';
            button.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            button.style.display = 'inline-block';
            button.style.margin = '0';
            button.style.float = 'none';
            button.style.verticalAlign = 'middle';
            button.style.lineHeight = 'normal';
            button.style.textDecoration = 'none';
        });
        
        // Style page input
        const pageInput = document.getElementById('txt_show_Page');
        if (pageInput) {
            pageInput.style.background = 'white';
            pageInput.style.border = '2px solid #ced4da';
            pageInput.style.borderRadius = '6px';
            pageInput.style.padding = '8px 12px';
            pageInput.style.textAlign = 'center';
            pageInput.style.fontSize = '13px';
            pageInput.style.fontWeight = '600';
            pageInput.style.color = '#495057';
            pageInput.style.minWidth = '60px';
            pageInput.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
            pageInput.style.display = 'inline-block';
            pageInput.style.margin = '0';
            pageInput.style.float = 'none';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mGrid (will use native URL and sorting)
    mGridInitialize(employeesGrid);

    // Initialize employee application (search and form functionality)
    EmpApp.init();
    
    // Style pagination buttons after a short delay to ensure mGrid has rendered
    setTimeout(stylePaginationButtons, 100);
    setTimeout(stylePaginationButtons, 500);
    setTimeout(stylePaginationButtons, 1000);
});
