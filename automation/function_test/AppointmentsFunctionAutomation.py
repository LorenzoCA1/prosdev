from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time


class AppointmentFunction(unittest.TestCase):
    @classmethod
    def setUpClass(inst):
        inst.driver = webdriver.Chrome("D:\\Programs\\PROSDEV\\prosdev\\automation\\chromedriver.exe")
        inst.driver.implicitly_wait(30)
        inst.driver.maximize_window()
        inst.driver.get("localhost:3000")

    def test_1_add_appointment(self):
        print("Add Appointments Test")
        self.appointment_button = self.driver.find_element_by_xpath('//*[@id="timetable"]/div[1]/div[3]/button')

    def test_2_edit_process(self):
        print("Edit Process Test")

    def test_3_delete_doctor(self):
        print("Delete Doctors Test")

    @classmethod
    def tearDownClass(inst):
        inst.driver.quit()

if __name__ == '__main__':
    unittest.main()