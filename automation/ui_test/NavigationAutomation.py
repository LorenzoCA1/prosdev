from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import unittest
import time

class SimpleNavigation(unittest.TestCase):
    @classmethod
    def setUpClass(inst):
        inst.driver = webdriver.Chrome("D:\\Programs\\PROSDEV\\prosdev\\automation\\chromedriver.exe")
        inst.driver.implicitly_wait(30)
        inst.driver.maximize_window()
        inst.driver.get("localhost:3000")

    def test_1_navigate_to_site_(self):
        print("Navigation Test")
        #self.title = self.driver.title
        self.driver.implicitly_wait(30) #seconds
        self.appointmentName = self.driver.find_element_by_xpath("/html/body/nav/a[1]")
        assert self.appointmentName.text == "Appointment"

    def test_2_add_doctor_popup(self):
        print("Doctor Lists PopUp Test")
        self.driver.implicitly_wait(10)
        self.addBtn = self.driver.find_element_by_xpath("/html/body/div[1]/div[2]/div[1]/div[1]/span[1]/i")
        self.addBtn.click()
        self.driver.implicitly_wait(10)
        self.doctorWindow = self.driver.find_elements_by_class_name("header")
        print(self.doctorWindow[0].text)
        assert self.doctorWindow[0].text == "Doctors"
    
    def test_3_add_process_popup(self):
        print("Proccess Add PopUp Test")
        self.driver.implicitly_wait(10)
        self.addBtn = self.driver.find_element_by_xpath("/html/body/div[1]/div[2]/div[2]/div[1]/span[1]/i")
        self.addBtn.click()
        self.driver.implicitly_wait(10)
        self.processWindow = self.driver.find_elements_by_class_name("header")
        print(self.processWindow[0].text)
        assert self.processWindow[0].text == "Procedure"
    
    @classmethod
    def tearDownClass(inst):
        inst.driver.quit()
        
#if __name__ == '__main__':
#    unittest.main()