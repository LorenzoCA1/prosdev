from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time
import re

doctor = ''

class PatientRequestFunction(unittest.TestCase):
    @classmethod
    def setUpClass(inst):
        inst.driver = webdriver.Chrome("D:\\Programs\\PROSDEV\\prosdev\\automation\\chromedriver.exe")
        inst.driver.implicitly_wait(30)
        inst.driver.maximize_window()
        inst.driver.get("localhost:3000/patientLogin")
        inst.driver.find_element_by_name('username').send_keys('qatest')
        inst.driver.find_element_by_name('password').send_keys('qatest')
        inst.driver.find_element_by_id('btn-signin').click()

    def test_1_successfull_request(self):
        print('Patient Requests For Appointment')
        self.driver.find_element_by_xpath('/html/body/nav/a[2]').click()
        self.driver.find_element_by_name('lastname').send_keys('QA')
        self.driver.find_element_by_name('firstname').send_keys('Test')
        self.date = self.driver.find_element_by_name('date')
        self.date.click()
        self.date.send_keys(Keys.SPACE)
        self.date.send_keys(Keys.RETURN)
        self.time = self.driver.find_element_by_name('time')
        self.time.send_keys('220p')
        #Doctor Clicking
        self.driver.find_element_by_xpath('//*[@id="selDoc"]/div').click()
        self.driver.find_element_by_css_selector('#selDoc > div > div.menu.transition.visible > div:nth-last-child(1)').click()
        self.notes = self.driver.find_element_by_name('notes')
        self.notes.click()
        self.notes.send_keys('QA TEST NOTES')
        #Procedure Clicking
        self.driver.find_element_by_xpath('//*[@id="app-form"]/div[2]/div[2]/div[2]/div').click()
        self.driver.find_element_by_css_selector('#app-form > div.ui.very.padded.grid.content > div.ten.wide.column.ui.form > div.required.field.fieldProcedures > div > div.menu.transition.visible >  div:nth-last-child(1)').click()
        self.notes.click()
        self.driver.find_element_by_xpath('//*[@id="add-app"]').click()
        time.sleep(3)
        self.driver.find_element_by_xpath('/html/body/nav/a[1]').click()
        time.sleep(3)

        self.src = self.driver.page_source
        self.text = re.search(r'QA TEST NOTES', self.src)
        self.assertNotEqual(self.text, None)

    def test_2_incomplete_form_(self):
        print('Patient Request Incomplete Form Validation')
        self.driver.find_element_by_xpath('/html/body/nav/a[2]').click()
        self.driver.find_element_by_xpath('//*[@id="add-app"]').click()
        time.sleep(3)
        assert self.driver.current_url == 'http://localhost:3000/request'

    def test_3_cancel_appointment(self):
        print('Patient Cancel Request Test')
        self.driver.find_element_by_xpath('/html/body/div/div/div/div[1]/span[2]').click()
        self.src = self.driver.page_source
        self.text = re.search(r'cancelled', self.src)
        self.assertNotEqual(self.text, None)

    @classmethod
    def tearDownClass(inst):
        inst.driver.quit()

if __name__ == '__main__':
    unittest.main()