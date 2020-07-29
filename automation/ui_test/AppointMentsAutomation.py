from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time

class AppointmentView(unittest.TestCase):


    @classmethod
    def setUpClass(inst):
        inst.driver = webdriver.Chrome("D:\\Programs\\PROSDEV\\prosdev\\automation\\chromedriver.exe")
        inst.driver.implicitly_wait(30)
        inst.driver.maximize_window()
        inst.driver.get("localhost:3000")

    def test_1_add_doctor(self):
        print("View Appointments Test")
        self.dateElement = self.driver.find_element_by_xpath("//*[@id=\"timetable\"]/div[1]/div[2]/h2")
        self.date = self.dateElement.text
        self.rightArrow = self.driver.find_element_by_xpath("//*[@id=\"timetable\"]/div[1]/div[1]/div[1]/button[2]")
        self.leftArrow  = self.driver.find_element_by_xpath("//*[@id=\"timetable\"]/div[1]/div[1]/div[1]/button[1]")

        #Edit in the Future so that its not brute forced test
        self.rightArrow.click()
        self.rightArrow.click()
        self.appointment = self.driver.find_element_by_xpath("//*[@id=\"timetable\"]/div[2]/div/table/tbody/tr[3]/td/div/div/div/div[2]/table/tbody/tr/td[4]/div/div[2]/div/a/div[1]")
        self.appointment.click()
        time.sleep(3)
        self.lastname = self.driver.find_element_by_xpath("//*[@id=\"lastname\"]")
        self.txt = self.lastname.get_attribute('value')
        print(self.txt)
        assert self.txt == 'Unit'

    @classmethod
    def tearDownClass(inst):
        inst.driver.quit()

if __name__ == '__main__':
    unittest.main()